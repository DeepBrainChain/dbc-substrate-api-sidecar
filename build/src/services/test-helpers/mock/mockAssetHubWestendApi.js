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
exports.mockAssetHubWestendApi = exports.assetHubWestendTx = exports.assetHubWestendPendingExtrinsics = exports.assetHubWestendSubmitExtrinsic = exports.assetHubWestendQueryInfoAt = exports.assetHubWestendQueryInfoCall = exports.assetHubWestendLedgerAt = exports.assetHubWestendBondedAt = exports.assetHubWestendErasStartSessionIndexAt = exports.assetHubWestendActiveEraAt = exports.assetHubWestendDeriveGetBlock = exports.assetHubWestendGetBlock = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const metadata_1 = require("../../../test-helpers/metadata/metadata");
const registries_1 = require("../../../test-helpers/registries");
const mockDispatchablesData_1 = require("../mock/data/mockDispatchablesData");
const _1 = require(".");
const localListenAddresses_1 = require("./data/localListenAddresses");
const mockNonimationPoolResponseData_1 = require("./data/mockNonimationPoolResponseData");
const traceBlock_json_1 = __importDefault(require("./data/traceBlock.json"));
const mockApi_1 = require("./mockApi");
const chain = () => Promise.resolve().then(() => {
    return registries_1.assetHubWestendRegistryV9435.createType('Text', ['Westmint']);
});
const assetHubWestendGetBlock = (_hash) => Promise.resolve().then(() => {
    return {
        block: _1.mockBlock5236177,
    };
});
exports.assetHubWestendGetBlock = assetHubWestendGetBlock;
const assetHubWestendDeriveGetBlock = (_hash) => Promise.resolve().then(() => {
    return {
        author: registries_1.assetHubWestendRegistryV9435.createType('AccountId', ['1zugcajGg5yDD9TEqKKzGx7iKuGWZMkRbYcyaFnaUaEkwMK']),
        block: _1.mockBlock5236177,
    };
});
exports.assetHubWestendDeriveGetBlock = assetHubWestendDeriveGetBlock;
const getHeader = (_hash) => Promise.resolve().then(() => _1.mockBlock5236177.header);
const runtimeVersion = {
    specName: registries_1.assetHubWestendRegistryV9435.createType('Text', ['Westmint']),
    specVersion: registries_1.assetHubWestendRegistryV9435.createType('u32', [16]),
    transactionVersion: registries_1.assetHubWestendRegistryV9435.createType('u32', [2]),
    implVersion: registries_1.assetHubWestendRegistryV9435.createType('u32', [0]),
    implName: registries_1.assetHubWestendRegistryV9435.createType('Text', ['westmint']),
    authoringVersion: registries_1.assetHubWestendRegistryV9435.createType('u32', [0]),
};
const getRuntimeVersion = () => Promise.resolve().then(() => {
    return runtimeVersion;
});
const getMetadata = () => Promise.resolve().then(() => metadata_1.assetHubWestendMetadata);
const deriveGetHeader = () => Promise.resolve().then(() => {
    return {
        author: registries_1.assetHubWestendRegistryV9435.createType('AccountId', ['1zugcajGg5yDD9TEqKKzGx7iKuGWZMkRbYcyaFnaUaEkwMK']),
    };
});
const version = () => Promise.resolve().then(() => registries_1.assetHubWestendRegistryV9435.createType('Text', ['0.8.22-c6ee8675-x86_64-linux-gnu']));
const assetHubWestendActiveEraAt = (_hash) => Promise.resolve().then(() => registries_1.assetHubWestendRegistryV9435.createType('Option<ActiveEraInfo>', [{ index: 49 }, { start: 1595259378000 }]));
exports.assetHubWestendActiveEraAt = assetHubWestendActiveEraAt;
const assetHubWestendErasStartSessionIndexAt = (_hash, _activeEra) => Promise.resolve().then(() => registries_1.assetHubWestendRegistryV9435.createType('Option<SessionIndex>', [330]));
exports.assetHubWestendErasStartSessionIndexAt = assetHubWestendErasStartSessionIndexAt;
const assetHubWestendBondedAt = (_hash, _address) => Promise.resolve().then(() => registries_1.assetHubWestendRegistryV9435.createType('Option<AccountId>', [_1.testAddressController]));
exports.assetHubWestendBondedAt = assetHubWestendBondedAt;
const assetHubWestendLedgerAt = (_hash, _address) => Promise.resolve().then(() => registries_1.assetHubWestendRegistryV9435.createType('Option<StakingLedger>', [
    '0x2c2a55b5e0d28cc772b47bb9b25981cbb69eca73f7c3388fb6464e7d24be470e0700e87648170700e8764817008c000000000100000002000000030000000400000005000000060000000700000008000000090000001700000018000000190000001a0000001b0000001c0000001d0000001e0000001f000000200000002100000022000000230000002400000025000000260000002700000028000000290000002a0000002b0000002c0000002d0000002e0000002f000000',
]));
exports.assetHubWestendLedgerAt = assetHubWestendLedgerAt;
// For getting the blockhash of the genesis block
const getBlockHashGenesis = (_zero) => Promise.resolve().then(() => registries_1.assetHubWestendRegistryV9435.createType('BlockHash', [
    '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
]));
const queryFeeDetails = () => Promise.resolve().then(() => {
    const inclusionFee = registries_1.assetHubWestendRegistryV9435.createType('Option<InclusionFee>', [
        {
            baseFee: 10000000,
            lenFee: 143000000,
            adjustedWeightFee: 20,
        },
    ]);
    return registries_1.assetHubWestendRegistryV9435.createType('FeeDetails', [
        {
            inclusionFee,
        },
    ]);
});
const runtimeDispatchInfo = registries_1.assetHubWestendRegistryV9435.createType('RuntimeDispatchInfo', {
    weight: {
        refTime: 125000000,
        proofSize: 0,
    },
    class: 'Normal',
    partialFee: 149000000,
});
const assetHubWestendQueryInfoCall = (_extrinsic, _length) => Promise.resolve().then(() => runtimeDispatchInfo);
exports.assetHubWestendQueryInfoCall = assetHubWestendQueryInfoCall;
const assetHubWestendQueryInfoAt = (_extrinsic, _hash) => Promise.resolve().then(() => runtimeDispatchInfo);
exports.assetHubWestendQueryInfoAt = assetHubWestendQueryInfoAt;
const assetHubWestendSubmitExtrinsic = (_extrinsic) => Promise.resolve().then(() => registries_1.assetHubWestendRegistryV9435.createType('Hash', []));
exports.assetHubWestendSubmitExtrinsic = assetHubWestendSubmitExtrinsic;
const getStorage = () => Promise.resolve().then(() => registries_1.assetHubWestendRegistryV9435.createType('Option<Raw>', ['0x00']));
const chainType = () => Promise.resolve().then(() => registries_1.assetHubWestendRegistryV9435.createType('ChainType', [
    {
        Live: null,
    },
]));
const properties = () => Promise.resolve().then(() => registries_1.assetHubWestendRegistryV9435.createType('ChainProperties', [
    {
        ss58Format: '0',
        tokenDecimals: '12',
        tokenSymbol: 'DOT',
    },
]));
const getFinalizedHead = () => Promise.resolve().then(() => _1.blockHash5236177);
const health = () => Promise.resolve().then(() => registries_1.assetHubWestendRegistryV9435.createType('Health', ['0x7a000000000000000001']));
const localListenAddresses = () => Promise.resolve().then(() => registries_1.assetHubWestendRegistryV9435.createType('Vec<Text>', [localListenAddresses_1.localListenAddressesHex]));
const nodeRoles = () => Promise.resolve().then(() => registries_1.assetHubWestendRegistryV9435.createType('Vec<NodeRole>', ['0x0400']));
const localPeerId = () => Promise.resolve().then(() => registries_1.assetHubWestendRegistryV9435.createType('Text', [
    '0x313244334b6f6f57415a66686a79717a4674796435357665424a78545969516b5872614d584c704d4d6a355a6f3471756431485a',
]));
const assetHubWestendPendingExtrinsics = () => Promise.resolve().then(() => registries_1.assetHubWestendRegistryV9435.createType('Vec<Extrinsic>', []));
exports.assetHubWestendPendingExtrinsics = assetHubWestendPendingExtrinsics;
const assetHubWestendTx = () => registries_1.assetHubWestendRegistryV9435.createType('Extrinsic', [_1.balancesTransferValid]);
exports.assetHubWestendTx = assetHubWestendTx;
const traceBlock = () => Promise.resolve().then(() => registries_1.kusamaRegistry.createType('TraceBlockResponse', [traceBlock_json_1.default.result]));
/**
 * Deafult Mock polkadot-js ApiPromise. Values are largely meant to be accurate for block
 * #5236177, which is what most Service unit tests are based on.
 */
exports.mockAssetHubWestendApi = {
    runtimeVersion,
    call: {
        transactionPaymentApi: {
            queryInfo: exports.assetHubWestendQueryInfoCall,
            queryFeeDetails,
        },
    },
    consts: {
        system: {
            blockLength: {
                max: {
                    normal: new bn_js_1.default(3932160),
                    operational: new bn_js_1.default(5242880),
                    mandatory: new bn_js_1.default(5242880),
                },
            },
            blockWeights: {
                baseBlock: new bn_js_1.default(5481991000),
                maxBlock: registries_1.assetHubWestendRegistryV9435.createType('u64', 15),
                perClass: mockApi_1.defaultMockApi.consts.system.blockWeights.perClass,
            },
        },
        transactionPayment: {
            operationalFeeMultiplier: new bn_js_1.default(5),
        },
    },
    createType: registries_1.assetHubWestendRegistryV9435.createType.bind(registries_1.assetHubWestendRegistryV9435),
    registry: registries_1.assetHubWestendRegistryV9435,
    tx: mockDispatchablesData_1.getPalletDispatchables,
    runtimeMetadata: metadata_1.assetHubWestendMetadata,
    rpc: {
        chain: {
            getHeader,
            assetHubWestendGetBlock: exports.assetHubWestendGetBlock,
            getBlockHash: getBlockHashGenesis,
            getFinalizedHead,
        },
        state: {
            getRuntimeVersion,
            getMetadata,
            getStorage,
            traceBlock,
        },
        system: {
            chain,
            health,
            localListenAddresses,
            nodeRoles,
            localPeerId,
            version,
            chainType,
            properties,
        },
        payment: {
            queryInfo: exports.assetHubWestendQueryInfoAt,
            queryFeeDetails,
        },
        author: {
            assetHubWestendSubmitExtrinsic: exports.assetHubWestendSubmitExtrinsic,
            assetHubWestendPendingExtrinsics: exports.assetHubWestendPendingExtrinsics,
        },
    },
    derive: {
        chain: {
            getHeader: deriveGetHeader,
            getBlock: exports.assetHubWestendDeriveGetBlock,
        },
    },
    query: {
        nominationPools: {
            metadata: mockNonimationPoolResponseData_1.getMetadata,
        },
    },
};
//# sourceMappingURL=mockAssetHubWestendApi.js.map