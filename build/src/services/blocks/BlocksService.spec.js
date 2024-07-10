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
const http_errors_1 = require("http-errors");
const lru_cache_1 = require("lru-cache");
const cache_1 = require("../../chains-config/cache");
const sanitizeNumbers_1 = require("../../sanitize/sanitizeNumbers");
const createCall_1 = require("../../test-helpers/createCall");
const registries_1 = require("../../test-helpers/registries");
const mock_1 = require("../test-helpers/mock");
const block789629_json_1 = __importDefault(require("../test-helpers/mock/data/block789629.json"));
const events789629Hex_1 = require("../test-helpers/mock/data/events789629Hex");
const events3356195Hex_1 = require("../test-helpers/mock/data/events3356195Hex");
const events6202603Hex_1 = require("../test-helpers/mock/data/events6202603Hex");
const events18468942Hex_1 = require("../test-helpers/mock/data/events18468942Hex");
const events19772575Hex_1 = require("../test-helpers/mock/data/events19772575Hex");
const validators789629Hex_1 = require("../test-helpers/mock/data/validators789629Hex");
const validators3356195Hex_1 = require("../test-helpers/mock/data/validators3356195Hex");
const validators6202603Hex_1 = require("../test-helpers/mock/data/validators6202603Hex");
const validators18468942Hex_1 = require("../test-helpers/mock/data/validators18468942Hex");
const validators19772575Hex_1 = require("../test-helpers/mock/data/validators19772575Hex");
const parseNumberOrThrow_1 = require("../test-helpers/mock/parseNumberOrThrow");
const block789629Extrinsic_json_1 = __importDefault(require("../test-helpers/responses/blocks/block789629Extrinsic.json"));
const block3356195_json_1 = __importDefault(require("../test-helpers/responses/blocks/block3356195.json"));
const block6202603paraId2087_json_1 = __importDefault(require("../test-helpers/responses/blocks/block6202603paraId2087.json"));
const block18468942_json_1 = __importDefault(require("../test-helpers/responses/blocks/block18468942.json"));
const block18468942paraId2000_json_1 = __importDefault(require("../test-helpers/responses/blocks/block18468942paraId2000.json"));
const block19772575_json_1 = __importDefault(require("../test-helpers/responses/blocks/block19772575.json"));
const blocks789629_json_1 = __importDefault(require("../test-helpers/responses/blocks/blocks789629.json"));
const blocks789629Raw_json_1 = __importDefault(require("../test-helpers/responses/blocks/blocks789629Raw.json"));
const BlocksService_1 = require("./BlocksService");
const validatorsAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Vec<ValidatorId>', validators789629Hex_1.validators789629Hex));
const eventsAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Vec<EventRecord>', events789629Hex_1.events789629));
const nextFeeMultiplierAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Fixed128', 1000000000));
const mockHistoricApi = {
    registry: registries_1.polkadotRegistry,
    call: {
        transactionPaymentApi: {},
    },
    consts: {
        transactionPayment: {
            transactionByteFee: registries_1.polkadotRegistry.createType('Balance', 1000000),
            weightToFee: [
                {
                    coeffFrac: registries_1.polkadotRegistry.createType('Perbill', 80000000),
                    coeffInteger: registries_1.polkadotRegistry.createType('Balance', 0),
                    degree: registries_1.polkadotRegistry.createType('u8', 1),
                    negative: false,
                },
            ],
        },
        system: {
            extrinsicBaseWeight: registries_1.polkadotRegistry.createType('u64', 125000000),
        },
    },
    query: {
        session: {
            validators: validatorsAt,
        },
        system: {
            events: eventsAt,
        },
        transactionPayment: {
            nextFeeMultiplier: nextFeeMultiplierAt,
        },
    },
};
const mockApi = {
    ...mock_1.defaultMockApi,
    query: {
        transactionPayment: {
            nextFeeMultiplier: { at: nextFeeMultiplierAt },
        },
    },
    at: (_hash) => mockHistoricApi,
};
// LRU cache used to cache blocks
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const cache = new lru_cache_1.LRUCache({ max: 2 });
// Block Service
const blocksService = new BlocksService_1.BlocksService(mockApi, 0, cache, new cache_1.QueryFeeDetailsCache(null, null));
describe('BlocksService', () => {
    describe('fetchBlock', () => {
        it('works when ApiPromise works (block 789629)', async () => {
            // Reset LRU cache
            cache.clear();
            // fetchBlock options
            const options = {
                eventDocs: true,
                extrinsicDocs: true,
                checkFinalized: false,
                queryFinalizedHead: false,
                omitFinalizedTag: false,
                noFees: false,
                checkDecodedXcm: false,
                paraId: undefined,
            };
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(await blocksService.fetchBlock(mock_1.blockHash789629, mockHistoricApi, options))).toMatchObject(blocks789629_json_1.default);
        });
        it('throws when an extrinsic is undefined', async () => {
            // Reset LRU cache
            cache.clear();
            // Create a block with undefined as the first extrinisic and the last extrinsic removed
            const mockBlock789629BadExt = registries_1.polkadotRegistry.createType('Block', block789629_json_1.default);
            mockBlock789629BadExt.extrinsics.pop();
            mockBlock789629BadExt.extrinsics.unshift(undefined);
            // fetchBlock Options
            const options = {
                eventDocs: false,
                extrinsicDocs: false,
                checkFinalized: false,
                queryFinalizedHead: false,
                omitFinalizedTag: false,
                noFees: false,
                checkDecodedXcm: false,
                paraId: undefined,
            };
            const tempGetBlock = mockApi.rpc.chain.getBlock;
            mockApi.rpc.chain.getBlock = (() => Promise.resolve().then(() => {
                return {
                    block: mockBlock789629BadExt,
                };
            }));
            await expect(blocksService.fetchBlock(mock_1.blockHash789629, mockHistoricApi, options)).rejects.toThrowError(TypeError);
            mockApi.rpc.chain.getBlock = tempGetBlock;
        });
        it('Returns the finalized tag as undefined when omitFinalizedTag equals true', async () => {
            // Reset LRU cache
            cache.clear();
            // fetchBlock options
            const options = {
                eventDocs: true,
                extrinsicDocs: true,
                checkFinalized: false,
                queryFinalizedHead: false,
                omitFinalizedTag: true,
                noFees: false,
                checkDecodedXcm: false,
                paraId: undefined,
            };
            const block = await blocksService.fetchBlock(mock_1.blockHash789629, mockHistoricApi, options);
            expect(block.finalized).toEqual(undefined);
        });
    });
    describe('BlocksService.parseGenericCall', () => {
        // Reset LRU cache
        cache.clear();
        const transfer = (0, createCall_1.createCall)('balances', 'transfer', {
            value: 12,
            dest: registries_1.kusamaRegistry.createType('AccountId', '14E5nqKAp3oAJcmzgZhUD2RcptBeUBScxKHgJKU4HPNcKVf3'), // Bob
        });
        const transferOutput = {
            method: {
                pallet: 'balances',
                method: 'transfer',
            },
            args: {
                dest: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
                value: 12,
            },
        };
        it('does not handle an empty object', () => expect(() => blocksService['parseGenericCall']({}, mockHistoricApi.registry)).toThrow());
        it('parses a simple balances.transfer', () => {
            expect(JSON.stringify(blocksService['parseGenericCall'](transfer, mockHistoricApi.registry))).toBe(JSON.stringify(transferOutput));
        });
        it('parses utility.batch nested 4 deep', () => {
            const batch1 = (0, createCall_1.createCall)('utility', 'batch', {
                calls: [transfer],
            });
            const batch2 = (0, createCall_1.createCall)('utility', 'batch', {
                calls: [batch1, transfer],
            });
            const batch3 = (0, createCall_1.createCall)('utility', 'batch', {
                calls: [batch2, transfer],
            });
            const batch4 = (0, createCall_1.createCall)('utility', 'batch', {
                calls: [batch3, transfer],
            });
            const baseBatch = {
                method: {
                    pallet: 'utility',
                    method: 'batch',
                },
                args: {
                    calls: [],
                },
            };
            expect(JSON.stringify(blocksService['parseGenericCall'](batch4, mockHistoricApi.registry))).toBe(JSON.stringify({
                ...baseBatch,
                args: {
                    calls: [
                        {
                            ...baseBatch,
                            args: {
                                calls: [
                                    {
                                        ...baseBatch,
                                        args: {
                                            calls: [
                                                {
                                                    ...baseBatch,
                                                    args: {
                                                        calls: [transferOutput],
                                                    },
                                                },
                                                transferOutput,
                                            ],
                                        },
                                    },
                                    transferOutput,
                                ],
                            },
                        },
                        transferOutput,
                    ],
                },
            }));
        });
        it('handles a batch transfer correctly', () => {
            const proxy = (0, createCall_1.createCall)('proxy', 'proxy', {
                forceProxyType: 'Any',
                call: transfer,
            });
            const batch = (0, createCall_1.createCall)('utility', 'batch', {
                calls: [proxy, proxy],
            });
            const proxyCall = {
                method: {
                    pallet: 'proxy',
                    method: 'proxy',
                },
                args: {
                    real: '5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM',
                    force_proxy_type: 'Any',
                    call: transferOutput,
                },
            };
            expect(JSON.stringify(blocksService['parseGenericCall'](batch, mockHistoricApi.registry))).toEqual(JSON.stringify({
                method: {
                    pallet: 'utility',
                    method: 'batch',
                },
                args: {
                    calls: [proxyCall, proxyCall],
                },
            }));
        });
    });
    describe('BlockService.isFinalizedBlock', () => {
        const finalizedHead = registries_1.polkadotRegistry.createType('BlockHash', '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3');
        const blockNumber = registries_1.polkadotRegistry.createType('Compact<BlockNumber>', 789629);
        it('Returns false when queried blockId is not canonical', async () => {
            // Reset LRU cache
            cache.clear();
            const getHeader = (_hash) => Promise.resolve().then(() => mock_1.mockForkedBlock789629.header);
            const getBlockHash = (_zero) => Promise.resolve().then(() => finalizedHead);
            const forkMockApi = {
                rpc: {
                    chain: {
                        getHeader,
                        getBlockHash,
                    },
                },
            };
            const queriedHash = registries_1.polkadotRegistry.createType('BlockHash', '0x7b713de604a99857f6c25eacc115a4f28d2611a23d9ddff99ab0e4f1c17a8578');
            expect(await blocksService['isFinalizedBlock'](forkMockApi, blockNumber, queriedHash, finalizedHead, true)).toEqual(false);
        });
        it('Returns true when queried blockId is canonical', async () => {
            const blocksService = new BlocksService_1.BlocksService(mockApi, 0, new lru_cache_1.LRUCache({ max: 2 }), new cache_1.QueryFeeDetailsCache(null, null));
            expect(await blocksService['isFinalizedBlock'](mockApi, blockNumber, finalizedHead, finalizedHead, true)).toEqual(true);
        });
    });
    describe('fetchExrinsicByIndex', () => {
        // fetchBlock options
        const options = {
            eventDocs: false,
            extrinsicDocs: false,
            checkFinalized: false,
            queryFinalizedHead: false,
            omitFinalizedTag: false,
            noFees: false,
            checkDecodedXcm: false,
            paraId: undefined,
        };
        it('Returns the correct extrinisics object for block 789629', async () => {
            // Reset LRU cache
            cache.clear();
            const block = await blocksService.fetchBlock(mock_1.blockHash789629, mockHistoricApi, options);
            /**
             * The `extrinsicIndex` (second param) is being tested for a non-zero
             * index here.
             */
            const extrinsic = blocksService['fetchExtrinsicByIndex'](block, 2);
            expect(JSON.stringify((0, sanitizeNumbers_1.sanitizeNumbers)(extrinsic))).toEqual(JSON.stringify(block789629Extrinsic_json_1.default));
        });
        it("Throw an error when `extrinsicIndex` doesn't exist", async () => {
            // Reset LRU cache
            cache.clear();
            const block = await blocksService.fetchBlock(mock_1.blockHash789629, mockHistoricApi, options);
            expect(() => {
                blocksService['fetchExtrinsicByIndex'](block, 5);
            }).toThrow(new http_errors_1.BadRequest('Requested `extrinsicIndex` does not exist'));
        });
        it('Throw an error when param `extrinsicIndex` is less than 0', () => {
            expect(() => {
                (0, parseNumberOrThrow_1.parseNumberOrThrow)('-5', '`exstrinsicIndex` path param is not a number');
            }).toThrow(new http_errors_1.BadRequest('`exstrinsicIndex` path param is not a number'));
        });
    });
    describe('fetchBlockSummary', () => {
        const expectedResponse = {
            parentHash: '0x205da5dba43bbecae52b44912249480aa9f751630872b6b6ba1a9d2aeabf0177',
            number: '789629',
            stateRoot: '0x023b5bb1bc10a1a91a9ef683f46a8bb09666c50476d5592bd6575a73777eb173',
            extrinsicsRoot: '0x4c1d65bf6b57086f00d5df40aa0686ffbc581ef60878645613b1fc3303de5030',
            digest: {
                logs: [
                    {
                        preRuntime: [
                            '0x42414245',
                            '0x036d000000f4f4d80f00000000ec9bd8e2d0368c97f3d888837f7283bbe08266869eb613159db547905026c2502a70f168b9ffcc233344005d11ebecd166769200d270a2eaa642118a00acb708a0487a440b0caf3dd5c91ab173e80ddfe5735ef8b938ea87a6105a1161612707',
                        ],
                    },
                    {
                        seal: [
                            '0x42414245',
                            '0xae78514e1de84a7d32e55b9b652f9d408ab1f7b4bfdbf6b2fad9cad94a91b86b0161cabf08f5ae1d3a1aa4993e2d96d56c94b03cee0898ccb8385a546084f88b',
                        ],
                    },
                ],
            },
        };
        it('Returns the correct summary for the latest block', async () => {
            // Reset LRU cache
            cache.clear();
            const blockSummary = await blocksService.fetchBlockHeader(mock_1.blockHash789629);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(blockSummary)).toStrictEqual(expectedResponse);
        });
        it('Returns the correct summary for the given block number', async () => {
            // Reset LRU cache
            cache.clear();
            const blockSummary = await blocksService.fetchBlockHeader();
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(blockSummary)).toStrictEqual(expectedResponse);
        });
    });
    describe('Block LRUcache', () => {
        // fetchBlock options
        const options = {
            eventDocs: true,
            extrinsicDocs: true,
            checkFinalized: false,
            queryFinalizedHead: false,
            omitFinalizedTag: false,
            noFees: false,
            checkDecodedXcm: false,
            paraId: undefined,
        };
        it('Should correctly store the most recent queried blocks', async () => {
            // Reset LRU cache
            cache.clear();
            await blocksService.fetchBlock(mock_1.blockHash789629, mockHistoricApi, options);
            await blocksService.fetchBlock(mock_1.blockHash20000, mockHistoricApi, options);
            expect(cache.size).toBe(2);
        });
        it('Should have a max of 2 blocks within the LRUcache, and should save the most recent and remove the oldest block', async () => {
            // Reset LRU cache
            cache.clear();
            await blocksService.fetchBlock(mock_1.blockHash789629, mockHistoricApi, options);
            await blocksService.fetchBlock(mock_1.blockHash20000, mockHistoricApi, options);
            await blocksService.fetchBlock(mock_1.blockHash100000, mockHistoricApi, options);
            expect(cache.get(mock_1.blockHash789629.toString())).toBe(undefined);
            expect(cache.size).toBe(2);
        });
    });
    describe('fetchBlockRaw', () => {
        it('works when ApiPromise works (block 789629)', async () => {
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(await blocksService.fetchBlockRaw(mock_1.blockHash789629))).toMatchObject(blocks789629Raw_json_1.default);
        });
    });
    describe('BlockService.decodedXcmMsgsArg', () => {
        // Reset LRU cache
        cache.clear();
        const validatorsAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Vec<ValidatorId>', validators18468942Hex_1.validators18468942Hex));
        const eventsAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Vec<EventRecord>', events18468942Hex_1.events18468942));
        const nextFeeMultiplierAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Fixed128', 1000000000));
        const mockHistoricApiXCM = {
            registry: registries_1.polkadotRegistryV1000001,
            call: {
                transactionPaymentApi: {},
            },
            consts: {
                transactionPayment: {
                    transactionByteFee: registries_1.polkadotRegistryV1000001.createType('Balance', 1000000),
                    weightToFee: [
                        {
                            coeffFrac: registries_1.polkadotRegistryV1000001.createType('Perbill', 80000000),
                            coeffInteger: registries_1.polkadotRegistryV1000001.createType('Balance', 0),
                            degree: registries_1.polkadotRegistryV1000001.createType('u8', 1),
                            negative: false,
                        },
                    ],
                },
                system: {
                    extrinsicBaseWeight: registries_1.polkadotRegistryV1000001.createType('u64', 125000000),
                },
            },
            query: {
                session: {
                    validators: validatorsAt,
                },
                system: {
                    events: eventsAt,
                },
                transactionPayment: {
                    nextFeeMultiplier: nextFeeMultiplierAt,
                },
            },
        };
        const mockApiXCM = {
            ...mock_1.mockApiBlock18468942,
            query: {
                transactionPayment: {
                    nextFeeMultiplier: { at: nextFeeMultiplierAt },
                },
            },
            at: (_hash) => mockHistoricApiXCM,
        };
        // Block Service
        const blocksServiceXCM = new BlocksService_1.BlocksService(mockApiXCM, 0, cache, new cache_1.QueryFeeDetailsCache(null, null));
        it('Should give back two decoded upward XCM messages for Polkadot block 18468942, one for paraId=2000 and one for paraId=2012', async () => {
            // fetchBlock options
            const options = {
                eventDocs: true,
                extrinsicDocs: true,
                checkFinalized: false,
                queryFinalizedHead: false,
                omitFinalizedTag: false,
                noFees: false,
                checkDecodedXcm: true,
                paraId: undefined,
            };
            const block = await blocksServiceXCM.fetchBlock(mock_1.blockHash18468942, mockHistoricApiXCM, options);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(block)).toMatchObject(block18468942_json_1.default);
        });
        it('Should give back one decoded upward XCM message for Polkadot block 18468942 only for paraId=2000', async () => {
            // Reset LRU cache
            cache.clear();
            // fetchBlock options
            const options = {
                eventDocs: true,
                extrinsicDocs: true,
                checkFinalized: false,
                queryFinalizedHead: false,
                omitFinalizedTag: false,
                noFees: false,
                checkDecodedXcm: true,
                paraId: 2000,
            };
            const block = await blocksServiceXCM.fetchBlock(mock_1.blockHash18468942, mockHistoricApiXCM, options);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(block)).toMatchObject(block18468942paraId2000_json_1.default);
        });
        it('Should give back two decoded XCM messages, one horizontal and one downward, for Kusama Asset Hub block 3356195', async () => {
            // Reset LRU cache
            cache.clear();
            // fetchBlock options
            const options = {
                eventDocs: true,
                extrinsicDocs: true,
                checkFinalized: false,
                queryFinalizedHead: false,
                omitFinalizedTag: false,
                noFees: false,
                checkDecodedXcm: true,
                paraId: undefined,
            };
            const validatorsAt = (_hash) => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('Vec<ValidatorId>', validators3356195Hex_1.validators3356195Hex));
            const eventsAt = (_hash) => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('Vec<EventRecord>', events3356195Hex_1.events3356195));
            const nextFeeMultiplierAt = (_hash) => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('Fixed128', 1000000000));
            const mockHistoricApiXCM = {
                registry: registries_1.assetHubKusamaRegistryV1000000,
                call: {
                    transactionPaymentApi: {},
                },
                consts: {
                    transactionPayment: {
                        transactionByteFee: registries_1.assetHubKusamaRegistryV1000000.createType('Balance', 1000000),
                        weightToFee: [
                            {
                                coeffFrac: registries_1.assetHubKusamaRegistryV1000000.createType('Perbill', 80000000),
                                coeffInteger: registries_1.assetHubKusamaRegistryV1000000.createType('Balance', 0),
                                degree: registries_1.assetHubKusamaRegistryV1000000.createType('u8', 1),
                                negative: false,
                            },
                        ],
                    },
                    system: {
                        extrinsicBaseWeight: registries_1.assetHubKusamaRegistryV1000000.createType('u64', 125000000),
                    },
                },
                query: {
                    session: {
                        validators: validatorsAt,
                    },
                    system: {
                        events: eventsAt,
                    },
                    transactionPayment: {
                        nextFeeMultiplier: nextFeeMultiplierAt,
                    },
                },
            };
            const mockApiXCM = {
                ...mock_1.mockAssetHubKusamaApiBlock3356195,
                query: {
                    transactionPayment: {
                        nextFeeMultiplier: { at: nextFeeMultiplierAt },
                    },
                },
                at: (_hash) => mockHistoricApiXCM,
            };
            // Block Service
            const blocksServiceXCM = new BlocksService_1.BlocksService(mockApiXCM, 0, cache, new cache_1.QueryFeeDetailsCache(null, null));
            const block = await blocksServiceXCM.fetchBlock(mock_1.blockHash3356195, mockHistoricApiXCM, options);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(block)).toMatchObject(block3356195_json_1.default);
        });
        it('Should give back one of the two available horizontal messages, the one for paraId 2087 for Kusama Asset Hub block 6202603', async () => {
            // Reset LRU cache
            cache.clear();
            // fetchBlock options
            const options = {
                eventDocs: true,
                extrinsicDocs: true,
                checkFinalized: false,
                queryFinalizedHead: false,
                omitFinalizedTag: false,
                noFees: false,
                checkDecodedXcm: true,
                paraId: 2087,
            };
            const validatorsAt = (_hash) => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000b.createType('Vec<ValidatorId>', validators6202603Hex_1.validators6202603Hex));
            const eventsAt = (_hash) => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000b.createType('Vec<EventRecord>', events6202603Hex_1.events6202603));
            const nextFeeMultiplierAt = (_hash) => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000b.createType('Fixed128', 1000000000));
            const mockHistoricApiXCM = {
                registry: registries_1.assetHubKusamaRegistryV1000000,
                call: {
                    transactionPaymentApi: {},
                },
                consts: {
                    transactionPayment: {
                        transactionByteFee: registries_1.assetHubKusamaRegistryV1000000b.createType('Balance', 1000000),
                        weightToFee: [
                            {
                                coeffFrac: registries_1.assetHubKusamaRegistryV1000000b.createType('Perbill', 80000000),
                                coeffInteger: registries_1.assetHubKusamaRegistryV1000000b.createType('Balance', 0),
                                degree: registries_1.assetHubKusamaRegistryV1000000b.createType('u8', 1),
                                negative: false,
                            },
                        ],
                    },
                    system: {
                        extrinsicBaseWeight: registries_1.assetHubKusamaRegistryV1000000b.createType('u64', 125000000),
                    },
                },
                query: {
                    session: {
                        validators: validatorsAt,
                    },
                    system: {
                        events: eventsAt,
                    },
                    transactionPayment: {
                        nextFeeMultiplier: nextFeeMultiplierAt,
                    },
                },
            };
            const mockApiXCM = {
                ...mock_1.mockAssetHubKusamaApiBlock6202603,
                query: {
                    transactionPayment: {
                        nextFeeMultiplier: { at: nextFeeMultiplierAt },
                    },
                },
                at: (_hash) => mockHistoricApiXCM,
            };
            // Block Service
            const blocksServiceXCM = new BlocksService_1.BlocksService(mockApiXCM, 0, cache, new cache_1.QueryFeeDetailsCache(null, null));
            const block = await blocksServiceXCM.fetchBlock(mock_1.blockHash6202603, mockHistoricApiXCM, options);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(block)).toMatchObject(block6202603paraId2087_json_1.default);
        });
        it('Should give back two decoded horizontal XCM messages (with different origin & destination paraId) that are `in transit` in Polkadot Relay block 19772575', async () => {
            // Reset LRU cache
            cache.clear();
            // fetchBlock options
            const options = {
                eventDocs: true,
                extrinsicDocs: true,
                checkFinalized: false,
                queryFinalizedHead: false,
                omitFinalizedTag: false,
                noFees: false,
                checkDecodedXcm: true,
                paraId: undefined,
            };
            const validatorsAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Vec<ValidatorId>', validators19772575Hex_1.validators19772575Hex));
            const eventsAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Vec<EventRecord>', events19772575Hex_1.events19772575));
            const nextFeeMultiplierAt = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Fixed128', 1000000000));
            const mockHistoricApiXCM = {
                registry: registries_1.polkadotRegistryV1000001,
                call: {
                    transactionPaymentApi: {},
                },
                consts: {
                    transactionPayment: {
                        transactionByteFee: registries_1.polkadotRegistryV1000001.createType('Balance', 1000000),
                        weightToFee: [
                            {
                                coeffFrac: registries_1.polkadotRegistryV1000001.createType('Perbill', 80000000),
                                coeffInteger: registries_1.polkadotRegistryV1000001.createType('Balance', 0),
                                degree: registries_1.polkadotRegistryV1000001.createType('u8', 1),
                                negative: false,
                            },
                        ],
                    },
                    system: {
                        extrinsicBaseWeight: registries_1.polkadotRegistryV1000001.createType('u64', 125000000),
                    },
                },
                query: {
                    session: {
                        validators: validatorsAt,
                    },
                    system: {
                        events: eventsAt,
                    },
                    transactionPayment: {
                        nextFeeMultiplier: nextFeeMultiplierAt,
                    },
                },
            };
            const mockApiXCM = {
                ...mock_1.mockApiBlock19772575,
                query: {
                    transactionPayment: {
                        nextFeeMultiplier: { at: nextFeeMultiplierAt },
                    },
                },
                at: (_hash) => mockHistoricApiXCM,
            };
            // Block Service
            const blocksServiceXCM = new BlocksService_1.BlocksService(mockApiXCM, 0, cache, new cache_1.QueryFeeDetailsCache(null, null));
            const block = await blocksServiceXCM.fetchBlock(mock_1.blockHash19772575, mockHistoricApiXCM, options);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(block)).toMatchObject(block19772575_json_1.default);
        });
    });
});
//# sourceMappingURL=BlocksService.spec.js.map