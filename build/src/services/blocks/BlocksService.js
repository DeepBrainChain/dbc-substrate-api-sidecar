"use strict";
// Copyright 2017-2024 Parity Technologies (UK) Ltd.
// This file is part of Substrate API Sidecar.
//
// Substrate API Sidecar is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlocksService = void 0;
const util_1 = require("@polkadot/api-derive/type/util");
const types_1 = require("@polkadot/types");
const util_2 = require("@polkadot/util");
const util_crypto_1 = require("@polkadot/util-crypto");
const calc_1 = require("@substrate/calc");
const bn_js_1 = __importDefault(require("bn.js"));
const http_errors_1 = require("http-errors");
const responses_1 = require("../../types/responses");
const util_3 = require("../../types/util");
const PromiseQueue_1 = require("../../util/PromiseQueue");
const AbstractService_1 = require("../AbstractService");
const XCMDecoder_1 = require("./XCMDecoder");
/**
 * Event methods that we check for.
 */
var Event;
(function (Event) {
    Event["success"] = "ExtrinsicSuccess";
    Event["failure"] = "ExtrinsicFailed";
    Event["transactionPaidFee"] = "TransactionFeePaid";
})(Event || (Event = {}));
class BlocksService extends AbstractService_1.AbstractService {
    constructor(api, minCalcFeeRuntime, blockStore, hasQueryFeeApi) {
        super(api);
        this.minCalcFeeRuntime = minCalcFeeRuntime;
        this.blockStore = blockStore;
        this.hasQueryFeeApi = hasQueryFeeApi;
    }
    /**
     * Fetch a block augmented with derived values.
     *
     * @param hash `BlockHash` of the block to fetch.
     * @param FetchBlockOptions options for additonal information.
     */
    async fetchBlock(hash, historicApi, { eventDocs, extrinsicDocs, checkFinalized, queryFinalizedHead, omitFinalizedTag, noFees, checkDecodedXcm, paraId, }) {
        const { api } = this;
        // Create a key for the cache that is a concatenation of the block hash and all the query params included in the request
        const cacheKey = hash.toString() +
            Number(eventDocs) +
            Number(extrinsicDocs) +
            Number(checkFinalized) +
            Number(noFees) +
            Number(checkDecodedXcm) +
            Number(paraId);
        // Before making any api calls check the cache if the queried block exists
        const isBlockCached = this.blockStore.get(cacheKey);
        if (isBlockCached && isBlockCached.finalized !== false) {
            return isBlockCached;
        }
        const [{ block }, { specName, specVersion }, validators, events, finalizedHead] = await Promise.all([
            api.rpc.chain.getBlock(hash),
            api.rpc.state.getRuntimeVersion(hash),
            this.fetchValidators(historicApi),
            this.fetchEvents(historicApi),
            queryFinalizedHead ? api.rpc.chain.getFinalizedHead() : Promise.resolve(hash),
        ]);
        if (block === undefined) {
            throw new http_errors_1.InternalServerError('Error querying for block');
        }
        const { parentHash, number, stateRoot, extrinsicsRoot, digest } = block.header;
        const authorId = (0, util_1.extractAuthor)(digest, validators);
        const logs = digest.logs.map(({ type, index, value }) => {
            return { type, index, value };
        });
        const nonSanitizedExtrinsics = this.extractExtrinsics(block, events, historicApi.registry, extrinsicDocs);
        const { extrinsics, onInitialize, onFinalize } = this.sanitizeEvents(events, nonSanitizedExtrinsics, hash, eventDocs);
        let finalized = undefined;
        if (!omitFinalizedTag) {
            // Check if the requested block is finalized
            finalized = await this.isFinalizedBlock(api, number, hash, finalizedHead, checkFinalized);
        }
        // The genesis block is a special case with little information associated with it.
        if (parentHash.every((byte) => !byte)) {
            return {
                number,
                hash,
                parentHash,
                stateRoot,
                extrinsicsRoot,
                authorId,
                logs,
                onInitialize,
                extrinsics,
                onFinalize,
                finalized,
            };
        }
        const previousBlockHash = await this.fetchPreviousBlockHash(number);
        /**
         * Fee calculation logic. This runs the extrinsics concurrently.
         */
        const pQueue = new PromiseQueue_1.PromiseQueue(4);
        const feeTasks = [];
        for (let idx = 0; idx < block.extrinsics.length; ++idx) {
            feeTasks.push(pQueue.run(async () => {
                await this.resolveExtFees(extrinsics, block, idx, noFees, previousBlockHash, specVersion, specName);
            }));
        }
        const decodedMsgs = checkDecodedXcm ? new XCMDecoder_1.XcmDecoder(api, specName.toString(), extrinsics, paraId) : undefined;
        const decodedXcmMsgs = decodedMsgs === null || decodedMsgs === void 0 ? void 0 : decodedMsgs.messages;
        await Promise.all(feeTasks);
        const response = {
            number,
            hash,
            parentHash,
            stateRoot,
            extrinsicsRoot,
            authorId,
            logs,
            onInitialize,
            extrinsics,
            onFinalize,
            finalized,
            decodedXcmMsgs,
        };
        // Store the block in the cache
        this.blockStore.set(cacheKey, response);
        return response;
    }
    async resolveExtFees(extrinsics, block, idx, noFees, previousBlockHash, specVersion, specName) {
        var _a, _b;
        const { api } = this;
        if (noFees) {
            extrinsics[idx].info = {};
            return;
        }
        if (!extrinsics[idx].paysFee || !block.extrinsics[idx].isSigned) {
            return;
        }
        if (this.minCalcFeeRuntime === null) {
            extrinsics[idx].info = {
                error: `Fee calculation not supported for this network`,
            };
            return;
        }
        if (this.minCalcFeeRuntime > specVersion.toNumber()) {
            extrinsics[idx].info = {
                error: `Fee calculation not supported for ${specVersion.toString()}#${specName.toString()}`,
            };
            return;
        }
        const xtEvents = extrinsics[idx].events;
        const completedEvent = xtEvents.find(({ method }) => (0, responses_1.isFrameMethod)(method) && (method.method === Event.success || method.method === Event.failure));
        if (!completedEvent) {
            extrinsics[idx].info = {
                error: 'Unable to find success or failure event for extrinsic',
            };
            return;
        }
        const completedData = completedEvent.data;
        if (!completedData) {
            extrinsics[idx].info = {
                error: 'Success or failure event for extrinsic does not contain expected data',
            };
            return;
        }
        // Both ExtrinsicSuccess and ExtrinsicFailed events have DispatchInfo
        // types as their final arg
        const weightInfo = completedData[completedData.length - 1];
        if (!weightInfo.weight) {
            extrinsics[idx].info = {
                error: 'Success or failure event for extrinsic does not specify weight',
            };
            return;
        }
        if (!((_a = api.rpc.payment) === null || _a === void 0 ? void 0 : _a.queryInfo) && !((_b = api.call.transactionPaymentApi) === null || _b === void 0 ? void 0 : _b.queryInfo)) {
            extrinsics[idx].info = {
                error: 'Rpc method payment::queryInfo is not available',
            };
            return;
        }
        const transactionPaidFeeEvent = xtEvents.find(({ method }) => (0, responses_1.isFrameMethod)(method) && method.method === Event.transactionPaidFee);
        const extrinsicSuccess = xtEvents.find(({ method }) => (0, responses_1.isFrameMethod)(method) && method.method === Event.success);
        const extrinsicFailed = xtEvents.find(({ method }) => (0, responses_1.isFrameMethod)(method) && method.method === Event.failure);
        const eventFailureOrSuccess = extrinsicSuccess || extrinsicFailed;
        if (transactionPaidFeeEvent && eventFailureOrSuccess) {
            let availableData;
            if (extrinsicSuccess) {
                availableData = eventFailureOrSuccess.data[0];
            }
            else {
                availableData = eventFailureOrSuccess.data[1];
            }
            extrinsics[idx].info = {
                weight: availableData.weight,
                class: availableData.class,
                partialFee: transactionPaidFeeEvent.data[1].toString(),
                kind: 'fromEvent',
            };
            return;
        }
        /**
         * Grab the initial partialFee, and information required for calculating a partialFee
         * if queryFeeDetails is available in the runtime.
         */
        const { class: dispatchClass, partialFee, weight, } = await this.fetchQueryInfo(block.extrinsics[idx], previousBlockHash);
        const versionedWeight = weight.refTime ? weight.refTime.unwrap() : weight;
        let finalPartialFee = partialFee.toString(), dispatchFeeType = 'preDispatch';
        if (transactionPaidFeeEvent) {
            finalPartialFee = transactionPaidFeeEvent.data[1].toString();
            dispatchFeeType = 'fromEvent';
        }
        else {
            /**
             * Call queryFeeDetails. It may not be available in the runtime and will
             * error automatically when we try to call it. We cache the runtimes it will error so we
             * don't try to call it again given a specVersion.
             */
            const doesQueryFeeDetailsExist = this.hasQueryFeeApi.hasQueryFeeDetails(specVersion.toNumber());
            if (doesQueryFeeDetailsExist === 'available') {
                finalPartialFee = await this.fetchQueryFeeDetails(block.extrinsics[idx], previousBlockHash, weightInfo.weight, versionedWeight.toString());
                dispatchFeeType = 'postDispatch';
            }
            else if (doesQueryFeeDetailsExist === 'unknown') {
                try {
                    finalPartialFee = await this.fetchQueryFeeDetails(block.extrinsics[idx], previousBlockHash, weightInfo.weight, versionedWeight.toString());
                    dispatchFeeType = 'postDispatch';
                    this.hasQueryFeeApi.setRegisterWithCall(specVersion.toNumber());
                }
                catch {
                    this.hasQueryFeeApi.setRegisterWithoutCall(specVersion.toNumber());
                    console.warn('The error above is automatically emitted from polkadot-js, and can be ignored.');
                }
            }
        }
        extrinsics[idx].info = {
            weight: weightInfo.weight,
            class: dispatchClass,
            partialFee: api.registry.createType('Balance', finalPartialFee),
            kind: dispatchFeeType,
        };
    }
    /**
     * Fetch `payment_queryFeeDetails`.
     *
     * @param ext
     * @param previousBlockHash
     * @param extrinsicSuccessWeight
     * @param estWeight
     */
    async fetchQueryFeeDetails(ext, previousBlockHash, extrinsicSuccessWeight, estWeight) {
        const { api } = this;
        const apiAt = await api.at(previousBlockHash);
        let inclusionFee;
        if (apiAt.call.transactionPaymentApi.queryFeeDetails) {
            const u8a = ext.toU8a();
            const result = await apiAt.call.transactionPaymentApi.queryFeeDetails(u8a, u8a.length);
            inclusionFee = result.inclusionFee;
        }
        else {
            const result = await api.rpc.payment.queryFeeDetails(ext.toHex(), previousBlockHash);
            inclusionFee = result.inclusionFee;
        }
        const finalPartialFee = this.calcPartialFee(extrinsicSuccessWeight, estWeight, inclusionFee);
        return finalPartialFee;
    }
    /**
     * Fetch `payment_queryInfo`.
     *
     * @param ext
     * @param previousBlockHash
     */
    async fetchQueryInfo(ext, previousBlockHash) {
        const { api } = this;
        const apiAt = await api.at(previousBlockHash);
        if (apiAt.call.transactionPaymentApi.queryInfo) {
            const u8a = ext.toU8a();
            return apiAt.call.transactionPaymentApi.queryInfo(u8a, u8a.length);
        }
        else {
            // fallback to rpc call
            return api.rpc.payment.queryInfo(ext.toHex(), previousBlockHash);
        }
    }
    /**
     * Retrieve the blockHash for the previous block to the one getting queried.
     * If the block is the geneisis hash it will return the same blockHash.
     *
     * @param blockNumber The blockId being queried
     */
    async fetchPreviousBlockHash(blockNumber) {
        const { api } = this;
        const num = blockNumber.toBn();
        return num.isZero() ? await api.rpc.chain.getBlockHash(num) : await api.rpc.chain.getBlockHash(num.sub(new bn_js_1.default(1)));
    }
    /**
     * Calculate the partialFee for an extrinsic. This uses `calc_partial_fee` from `@substrate/calc`.
     * Please reference the rust code in `@substrate/calc` too see docs on the algorithm.
     *
     * @param extrinsicSuccessWeight
     * @param estWeight
     * @param inclusionFee
     */
    calcPartialFee(extrinsicSuccessWeight, estWeight, inclusionFee) {
        if (inclusionFee.isSome) {
            const { baseFee, lenFee, adjustedWeightFee } = inclusionFee.unwrap();
            return (0, calc_1.calc_partial_fee)(baseFee.toString(), lenFee.toString(), adjustedWeightFee.toString(), estWeight.toString(), extrinsicSuccessWeight.toString());
        }
        else {
            // When the inclusion fee isNone we are dealing with a unsigned extrinsic.
            return '0';
        }
    }
    /**
     * Return the header of a block
     *
     * @param hash When no hash is inputted the header of the chain will be queried.
     */
    async fetchBlockHeader(hash) {
        const { api } = this;
        const header = hash ? await api.rpc.chain.getHeader(hash) : await api.rpc.chain.getHeader();
        return header;
    }
    /**
     *
     * @param block Takes in a block which is the result of `BlocksService.fetchBlock`
     * @param extrinsicIndex Parameter passed into the request
     */
    fetchExtrinsicByIndex(block, extrinsicIndex) {
        if (extrinsicIndex > block.extrinsics.length - 1) {
            throw new http_errors_1.BadRequest('Requested `extrinsicIndex` does not exist');
        }
        const { hash, number } = block;
        const height = number.unwrap().toString(10);
        return {
            at: {
                height,
                hash,
            },
            extrinsics: block.extrinsics[extrinsicIndex],
        };
    }
    /**
     * Extract extrinsics from a block.
     *
     * @param block Block
     * @param events events fetched by `fetchEvents`
     * @param regsitry The corresponding blocks runtime registry
     * @param extrinsicDocs To include the extrinsic docs or not
     */
    extractExtrinsics(block, events, registry, extrinsicDocs) {
        const defaultSuccess = typeof events === 'string' ? events : false;
        return block.extrinsics.map((extrinsic) => {
            const { method, nonce, signature, signer, isSigned, tip, era } = extrinsic;
            const hash = (0, util_2.u8aToHex)((0, util_crypto_1.blake2AsU8a)(extrinsic.toU8a(), 256));
            const call = registry.createType('Call', method);
            return {
                method: {
                    pallet: method.section,
                    method: method.method,
                },
                signature: isSigned ? { signature, signer } : null,
                nonce: isSigned ? nonce : null,
                args: this.parseGenericCall(call, registry).args,
                tip: isSigned ? tip : null,
                hash,
                info: {},
                era,
                events: [],
                success: defaultSuccess,
                // paysFee overrides to bool if `system.ExtrinsicSuccess|ExtrinsicFailed` event is present
                // we set to false if !isSigned because unsigned never pays a fee
                paysFee: isSigned ? null : false,
                docs: extrinsicDocs ? this.sanitizeDocs(extrinsic.meta.docs) : undefined,
            };
        });
    }
    /**
     * Sanitize events and attribute them to an extrinsic, onInitialize, or
     * onFinalize.
     *
     * @param events events from `fetchEvents`
     * @param extrinsics extrinsics from
     * @param hash hash of the block the events are from
     */
    sanitizeEvents(events, extrinsics, hash, eventDocs) {
        const onInitialize = { events: [] };
        const onFinalize = { events: [] };
        if (Array.isArray(events)) {
            for (const record of events) {
                const { event, phase } = record;
                const sanitizedEvent = {
                    method: {
                        pallet: event.section,
                        method: event.method,
                    },
                    data: event.data,
                    docs: eventDocs ? this.sanitizeDocs(event.data.meta.docs) : undefined,
                };
                if (phase.isApplyExtrinsic) {
                    const extrinsicIdx = phase.asApplyExtrinsic.toNumber();
                    const extrinsic = extrinsics[extrinsicIdx];
                    if (!extrinsic) {
                        throw new Error(`Missing extrinsic ${extrinsicIdx} in block ${hash.toString()}`);
                    }
                    if (event.method === Event.success) {
                        extrinsic.success = true;
                    }
                    if (event.method === Event.success || event.method === Event.failure) {
                        const sanitizedData = event.data.toJSON();
                        for (const data of sanitizedData) {
                            if (extrinsic.signature && (0, util_3.isPaysFee)(data)) {
                                extrinsic.paysFee = data.paysFee === true || data.paysFee === 'Yes';
                                break;
                            }
                        }
                    }
                    extrinsic.events.push(sanitizedEvent);
                }
                else if (phase.isFinalization) {
                    onFinalize.events.push(sanitizedEvent);
                }
                else if (phase.isInitialization) {
                    onInitialize.events.push(sanitizedEvent);
                }
            }
        }
        return {
            extrinsics,
            onInitialize,
            onFinalize,
        };
    }
    /**
     * Fetch events for the specified block.
     *
     * @param historicApi ApiDecoration to use for the query
     */
    async fetchEvents(historicApi) {
        try {
            return await historicApi.query.system.events();
        }
        catch {
            return 'Unable to fetch Events, cannot confirm extrinsic status. Check pruning settings on the node.';
        }
    }
    /**
     * Checks to see if the current chain has the session module, then retrieve all
     * validators.
     *
     * @param historicApi ApiDecoration to use for the query
     */
    async fetchValidators(historicApi) {
        return historicApi.query.session
            ? await historicApi.query.session.validators()
            : [];
    }
    /**
     * Helper function for `parseGenericCall`.
     *
     * @param argsArray array of `Codec` values
     * @param registry type registry of the block the call belongs to
     */
    parseArrayGenericCalls(argsArray, registry) {
        return argsArray.map((argument) => {
            if (argument instanceof types_1.GenericCall) {
                return this.parseGenericCall(argument, registry);
            }
            return argument;
        });
    }
    /**
     * Recursively parse a `GenericCall` in order to label its arguments with
     * their param names and give a human friendly method name (opposed to just a
     * call index). Parses `GenericCall`s that are nested as arguments.
     *
     * @param genericCall `GenericCall`
     * @param registry type registry of the block the call belongs to
     */
    parseGenericCall(genericCall, registry) {
        const newArgs = {};
        // Pull out the struct of arguments to this call
        const callArgs = genericCall.get('args');
        // Make sure callArgs exists and we can access its keys
        if (callArgs && callArgs.defKeys) {
            // paramName is a string
            for (const paramName of callArgs.defKeys) {
                const argument = callArgs.get(paramName);
                if (Array.isArray(argument)) {
                    newArgs[paramName] = this.parseArrayGenericCalls(argument, registry);
                }
                else if (argument instanceof types_1.GenericCall) {
                    newArgs[paramName] = this.parseGenericCall(argument, registry);
                }
                else if (argument &&
                    paramName === 'call' &&
                    ['Bytes', 'WrapperKeepOpaque<Call>', 'WrapperOpaque<Call>'].includes(argument === null || argument === void 0 ? void 0 : argument.toRawType())) {
                    // multiSig.asMulti.args.call is either an OpaqueCall (Vec<u8>),
                    // WrapperKeepOpaque<Call>, or WrapperOpaque<Call> that we
                    // serialize to a polkadot-js Call and parse so it is not a hex blob.
                    try {
                        const call = registry.createType('Call', argument.toHex());
                        newArgs[paramName] = this.parseGenericCall(call, registry);
                    }
                    catch {
                        newArgs[paramName] = argument;
                    }
                }
                else {
                    newArgs[paramName] = argument;
                }
            }
        }
        return {
            method: {
                pallet: genericCall.section,
                method: genericCall.method,
            },
            args: newArgs,
        };
    }
    /**
     * When querying a block this will immediately inform the request whether
     * or not the queried block is considered finalized at the time of querying.
     *
     * @param api ApiPromise to use for query
     * @param blockNumber Queried block number
     * @param queriedHash Hash of user queried block
     * @param finalizedHead Finalized head for our chain
     * @param checkFinalized If the passed in blockId is a hash
     */
    async isFinalizedBlock(api, blockNumber, queriedHash, finalizedHead, checkFinalized) {
        if (checkFinalized) {
            // The blockId url param is a hash
            const [finalizedHeadBlock, canonHash] = await Promise.all([
                // Returns the header of the most recently finalized block
                api.rpc.chain.getHeader(finalizedHead),
                // Fetch the hash of the block with equal height on the canon chain.
                // N.B. We assume when we query by number <= finalized head height,
                // we will always get a block on the finalized, canonical chain.
                api.rpc.chain.getBlockHash(blockNumber.unwrap()),
            ]);
            // If queried by hash this is the original request param
            const hash = queriedHash.toHex();
            // If this conditional is satisfied, the queried hash is on a fork,
            // and is not on the canonical chain and therefore not finalized
            if (canonHash.toHex() !== hash) {
                return false;
            }
            // Retreive the finalized head blockNumber
            const finalizedHeadBlockNumber = finalizedHeadBlock === null || finalizedHeadBlock === void 0 ? void 0 : finalizedHeadBlock.number;
            // If the finalized head blockNumber is undefined return false
            if (!finalizedHeadBlockNumber) {
                return false;
            }
            // Check if the user's block is less than or equal to the finalized head.
            // If so, the user's block is finalized.
            return blockNumber.unwrap().lte(finalizedHeadBlockNumber.unwrap());
        }
        else {
            // The blockId url param is an integer
            // Returns the header of the most recently finalized block
            const finalizedHeadBlock = await api.rpc.chain.getHeader(finalizedHead);
            // Retreive the finalized head blockNumber
            const finalizedHeadBlockNumber = finalizedHeadBlock === null || finalizedHeadBlock === void 0 ? void 0 : finalizedHeadBlock.number;
            // If the finalized head blockNumber is undefined return false
            if (!finalizedHeadBlockNumber) {
                return false;
            }
            // Check if the user's block is less than or equal to the finalized head.
            // If so, the user's block is finalized.
            return blockNumber.unwrap().lte(finalizedHeadBlockNumber.unwrap());
        }
    }
    /**
     * Fetch a block with raw extrinics values.
     *
     * @param hash `BlockHash` of the block to fetch.
     */
    async fetchBlockRaw(hash) {
        const { api } = this;
        const { block } = await api.rpc.chain.getBlock(hash);
        const { parentHash, number, stateRoot, extrinsicsRoot, digest } = block.header;
        const { extrinsics } = block;
        const logs = digest.logs.map(({ type, index, value }) => {
            return { type, index, value };
        });
        return {
            parentHash: parentHash,
            number: number.toHex(),
            stateRoot: stateRoot,
            extrinsicRoot: extrinsicsRoot,
            digest: { logs },
            extrinsics: extrinsics,
        };
    }
}
exports.BlocksService = BlocksService;
//# sourceMappingURL=BlocksService.js.map