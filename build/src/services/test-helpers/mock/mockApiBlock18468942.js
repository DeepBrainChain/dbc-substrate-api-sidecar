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
exports.mockApiBlock18468942 = exports.txXCM = exports.pendingExtrinsicsXCM = exports.submitExtrinsicXCM = exports.queryInfoAtXCM = exports.queryInfoCallXCM = exports.ledgerAtXCM = exports.bondedAtXCM = exports.erasStartSessionIndexAtXCM = exports.activeEraAtXCM = exports.deriveGetBlockXCM = exports.getBlockXCM = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const polkadotV1000001Metadata_1 = require("../../../test-helpers/metadata/polkadotV1000001Metadata");
const registries_1 = require("../../../test-helpers/registries");
const _1 = require(".");
const localListenAddresses_1 = require("./data/localListenAddresses");
const mockDispatchablesData_1 = require("./data/mockDispatchablesData");
const mockNonimationPoolResponseData_1 = require("./data/mockNonimationPoolResponseData");
const traceBlock_json_1 = __importDefault(require("./data/traceBlock.json"));
const mockApi_1 = require("./mockApi");
const chain = () => Promise.resolve().then(() => {
    return registries_1.polkadotRegistryV1000001.createType('Text', 'Polkadot');
});
const getBlockXCM = (_hash) => Promise.resolve().then(() => {
    return {
        block: _1.mockBlock18468942,
    };
});
exports.getBlockXCM = getBlockXCM;
const deriveGetBlockXCM = (_hash) => Promise.resolve().then(() => {
    return {
        author: registries_1.polkadotRegistryV1000001.createType('AccountId', '16A1zLQ3KjMnxch1NAU44hoijFK3fHUjqb11bVgcHCfoj9z3'),
        block: _1.mockBlock18468942,
    };
});
exports.deriveGetBlockXCM = deriveGetBlockXCM;
const getHeader = (_hash) => Promise.resolve().then(() => _1.mockBlock18468942.header);
const runtimeVersion = {
    specName: registries_1.polkadotRegistryV1000001.createType('Text', 'polkadot'),
    specVersion: registries_1.polkadotRegistryV1000001.createType('u32', 16),
    transactionVersion: registries_1.polkadotRegistryV1000001.createType('u32', 2),
    implVersion: registries_1.polkadotRegistryV1000001.createType('u32', 0),
    implName: registries_1.polkadotRegistryV1000001.createType('Text', 'parity-polkadot'),
    authoringVersion: registries_1.polkadotRegistryV1000001.createType('u32', 0),
};
const getRuntimeVersion = () => Promise.resolve().then(() => {
    return runtimeVersion;
});
const getMetadata = () => Promise.resolve().then(() => polkadotV1000001Metadata_1.polkadotMetadataRpcV1000001);
const deriveGetHeader = () => Promise.resolve().then(() => {
    return {
        author: registries_1.polkadotRegistryV1000001.createType('AccountId', '16A1zLQ3KjMnxch1NAU44hoijFK3fHUjqb11bVgcHCfoj9z3'),
    };
});
const version = () => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Text', '0.8.22-c6ee8675-x86_64-linux-gnu'));
const activeEraAtXCM = (_hash) => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Option<ActiveEraInfo>', {
    index: 49,
    start: 1595259378000,
}));
exports.activeEraAtXCM = activeEraAtXCM;
const erasStartSessionIndexAtXCM = (_hash, _activeEra) => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Option<SessionIndex>', 330));
exports.erasStartSessionIndexAtXCM = erasStartSessionIndexAtXCM;
const bondedAtXCM = (_hash, _address) => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Option<AccountId>', _1.testAddressController));
exports.bondedAtXCM = bondedAtXCM;
const ledgerAtXCM = (_hash, _address) => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Option<StakingLedger>', '0x2c2a55b5e0d28cc772b47bb9b25981cbb69eca73f7c3388fb6464e7d24be470e0700e87648170700e8764817008c000000000100000002000000030000000400000005000000060000000700000008000000090000001700000018000000190000001a0000001b0000001c0000001d0000001e0000001f000000200000002100000022000000230000002400000025000000260000002700000028000000290000002a0000002b0000002c0000002d0000002e0000002f000000'));
exports.ledgerAtXCM = ledgerAtXCM;
// For getting the blockhash of the genesis block
const getBlockHashGenesis = (_zero) => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('BlockHash', '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'));
const queryFeeDetails = () => Promise.resolve().then(() => {
    const inclusionFee = registries_1.polkadotRegistryV1000001.createType('Option<InclusionFee>', {
        baseFee: 10000000,
        lenFee: 143000000,
        adjustedWeightFee: 20,
    });
    return registries_1.polkadotRegistryV1000001.createType('FeeDetails', {
        inclusionFee,
    });
});
const runtimeDispatchInfo = registries_1.polkadotRegistryV1000001.createType('RuntimeDispatchInfo', {
    weight: [195000000, 0],
    class: 'Normal',
    partialFee: 149000000,
});
const queryInfoCallXCM = (_extrinsic, _length) => Promise.resolve().then(() => runtimeDispatchInfo);
exports.queryInfoCallXCM = queryInfoCallXCM;
const queryInfoAtXCM = (_extrinsic, _hash) => Promise.resolve().then(() => runtimeDispatchInfo);
exports.queryInfoAtXCM = queryInfoAtXCM;
const submitExtrinsicXCM = (_extrinsic) => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Hash'));
exports.submitExtrinsicXCM = submitExtrinsicXCM;
const getStorage = () => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Option<Raw>', '0x00'));
const chainType = () => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('ChainType', {
    Live: null,
}));
const properties = () => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('ChainProperties', {
    ss58Format: '0',
    tokenDecimals: '12',
    tokenSymbol: 'DOT',
}));
const getFinalizedHead = () => Promise.resolve().then(() => _1.blockHash18468942);
const health = () => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Health', '0x7a000000000000000001'));
const localListenAddresses = () => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Vec<Text>', localListenAddresses_1.localListenAddressesHex));
const nodeRoles = () => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Vec<NodeRole>', '0x0400'));
const localPeerId = () => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Text', '0x313244334b6f6f57415a66686a79717a4674796435357665424a78545969516b5872614d584c704d4d6a355a6f3471756431485a'));
const pendingExtrinsicsXCM = () => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('Vec<Extrinsic>'));
exports.pendingExtrinsicsXCM = pendingExtrinsicsXCM;
const txXCM = () => registries_1.polkadotRegistryV1000001.createType('Extrinsic', _1.balancesTransferValid);
exports.txXCM = txXCM;
const traceBlock = () => Promise.resolve().then(() => registries_1.polkadotRegistryV1000001.createType('TraceBlockResponse', traceBlock_json_1.default.result));
/**
 * Mock polkadot-js ApiPromise. Values are largely meant to be accurate for block
 * #18468942, which is what the XCM test in BlockService use.
 */
exports.mockApiBlock18468942 = {
    runtimeVersion,
    call: {
        transactionPaymentApi: {
            queryInfo: exports.queryInfoCallXCM,
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
                maxBlock: registries_1.polkadotRegistryV1000001.createType('u64', 15),
                perClass: mockApi_1.defaultMockApi.consts.system.blockWeights.perClass,
            },
        },
        transactionPayment: {
            operationalFeeMultiplier: new bn_js_1.default(5),
        },
    },
    createType: registries_1.polkadotRegistryV1000001.createType.bind(registries_1.polkadotRegistryV1000001),
    registry: registries_1.polkadotRegistryV1000001,
    tx: mockDispatchablesData_1.getPalletDispatchables,
    runtimeMetadata: polkadotV1000001Metadata_1.polkadotMetadataRpcV1000001,
    rpc: {
        chain: {
            getHeader,
            getBlock: exports.getBlockXCM,
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
            queryInfo: exports.queryInfoAtXCM,
            queryFeeDetails,
        },
        author: {
            submitExtrinsicXCM: exports.submitExtrinsicXCM,
            pendingExtrinsicsXCM: exports.pendingExtrinsicsXCM,
        },
    },
    derive: {
        chain: {
            getHeader: deriveGetHeader,
            getBlock: exports.deriveGetBlockXCM,
        },
    },
    query: {
        nominationPools: {
            metadata: mockNonimationPoolResponseData_1.getMetadata,
        },
    },
};
//# sourceMappingURL=mockApiBlock18468942.js.map