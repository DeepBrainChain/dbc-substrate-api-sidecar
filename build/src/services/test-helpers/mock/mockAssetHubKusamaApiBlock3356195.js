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
exports.mockAssetHubKusamaApiBlock3356195 = exports.assetHubKusamaTx3356195 = exports.assetHubKusamaPendingExtrinsics3356195 = exports.assetHubKusamaSubmitExtrinsic3356195 = exports.assetHubKusamaQueryInfoAt3356195 = exports.assetHubKusamaQueryInfoCall3356195 = exports.assetHubKusamaLedgerAt3356195 = exports.assetHubKusamaBondedAt3356195 = exports.assetHubKusamaErasStartSessionIndexAt3356195 = exports.assetHubKusamaActiveEraAt3356195 = exports.assetHubKusamaDeriveGetBlock3356195 = exports.assetHubKusamaGetBlock3356195 = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const assetHubKusamaMetadataV1000000_1 = require("../../../test-helpers/metadata/assetHubKusamaMetadataV1000000");
const registries_1 = require("../../../test-helpers/registries");
const _1 = require(".");
const localListenAddresses_1 = require("./data/localListenAddresses");
const mockDispatchablesData_1 = require("./data/mockDispatchablesData");
const mockNonimationPoolResponseData_1 = require("./data/mockNonimationPoolResponseData");
const traceBlock_json_1 = __importDefault(require("./data/traceBlock.json"));
const mockApi_1 = require("./mockApi");
const chain = () => Promise.resolve().then(() => {
    return registries_1.assetHubKusamaRegistryV1000000.createType('Text', 'Kusama Asset Hub');
});
const assetHubKusamaGetBlock3356195 = (_hash) => Promise.resolve().then(() => {
    return {
        block: _1.mockBlock3356195,
    };
});
exports.assetHubKusamaGetBlock3356195 = assetHubKusamaGetBlock3356195;
const assetHubKusamaDeriveGetBlock3356195 = (_hash) => Promise.resolve().then(() => {
    return {
        author: registries_1.assetHubKusamaRegistryV1000000.createType('AccountId', 'CbLdvHtKPVr1bvt7poBKwJsQUokfjC4kqoMkjeyCDtFs8wQ'),
        block: _1.mockBlock3356195,
    };
});
exports.assetHubKusamaDeriveGetBlock3356195 = assetHubKusamaDeriveGetBlock3356195;
const getHeader = (_hash) => Promise.resolve().then(() => _1.mockBlock3356195.header);
const runtimeVersion = {
    specName: registries_1.assetHubKusamaRegistryV1000000.createType('Text', 'statemine'),
    specVersion: registries_1.assetHubKusamaRegistryV1000000.createType('u32', 16),
    transactionVersion: registries_1.assetHubKusamaRegistryV1000000.createType('u32', 2),
    implVersion: registries_1.assetHubKusamaRegistryV1000000.createType('u32', 0),
    implName: registries_1.assetHubKusamaRegistryV1000000.createType('Text', 'parity-kusama'),
    authoringVersion: registries_1.assetHubKusamaRegistryV1000000.createType('u32', 1),
};
const getRuntimeVersion = () => Promise.resolve().then(() => {
    return runtimeVersion;
});
const getMetadata = () => Promise.resolve().then(() => assetHubKusamaMetadataV1000000_1.assetHubKusamaV1000000);
const deriveGetHeader = () => Promise.resolve().then(() => {
    return {
        author: registries_1.assetHubKusamaRegistryV1000000.createType('AccountId', 'CbLdvHtKPVr1bvt7poBKwJsQUokfjC4kqoMkjeyCDtFs8wQ'),
    };
});
const version = () => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('Text', '0.8.22-c6ee8675-x86_64-linux-gnu'));
const assetHubKusamaActiveEraAt3356195 = (_hash) => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('Option<ActiveEraInfo>', {
    index: 49,
    start: 1595259378000,
}));
exports.assetHubKusamaActiveEraAt3356195 = assetHubKusamaActiveEraAt3356195;
const assetHubKusamaErasStartSessionIndexAt3356195 = (_hash, _activeEra) => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('Option<SessionIndex>', 330));
exports.assetHubKusamaErasStartSessionIndexAt3356195 = assetHubKusamaErasStartSessionIndexAt3356195;
const assetHubKusamaBondedAt3356195 = (_hash, _address) => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('Option<AccountId>', _1.testAddressController));
exports.assetHubKusamaBondedAt3356195 = assetHubKusamaBondedAt3356195;
const assetHubKusamaLedgerAt3356195 = (_hash, _address) => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('Option<StakingLedger>', '0x2c2a55b5e0d28cc772b47bb9b25981cbb69eca73f7c3388fb6464e7d24be470e0700e87648170700e8764817008c000000000100000002000000030000000400000005000000060000000700000008000000090000001700000018000000190000001a0000001b0000001c0000001d0000001e0000001f000000200000002100000022000000230000002400000025000000260000002700000028000000290000002a0000002b0000002c0000002d0000002e0000002f000000'));
exports.assetHubKusamaLedgerAt3356195 = assetHubKusamaLedgerAt3356195;
// For getting the blockhash of the genesis block
const getBlockHashGenesis = (_zero) => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('BlockHash', '0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a'));
const queryFeeDetails = () => Promise.resolve().then(() => {
    const inclusionFee = registries_1.assetHubKusamaRegistryV1000000.createType('Option<InclusionFee>', {
        baseFee: 10000000,
        lenFee: 143000000,
        adjustedWeightFee: 20,
    });
    return registries_1.assetHubKusamaRegistryV1000000.createType('FeeDetails', {
        inclusionFee,
    });
});
const runtimeDispatchInfoV2 = registries_1.assetHubKusamaRegistryV1000000.createType('RuntimeDispatchInfoV2', {
    weight: {
        refTime: 1200000000,
        proofSize: 20000,
    },
    class: 'Normal',
    partialFee: 149000000,
});
const assetHubKusamaQueryInfoCall3356195 = (_extrinsic, _length) => Promise.resolve().then(() => runtimeDispatchInfoV2);
exports.assetHubKusamaQueryInfoCall3356195 = assetHubKusamaQueryInfoCall3356195;
const assetHubKusamaQueryInfoAt3356195 = (_extrinsic, _hash) => Promise.resolve().then(() => runtimeDispatchInfoV2);
exports.assetHubKusamaQueryInfoAt3356195 = assetHubKusamaQueryInfoAt3356195;
const assetHubKusamaSubmitExtrinsic3356195 = (_extrinsic) => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('Hash'));
exports.assetHubKusamaSubmitExtrinsic3356195 = assetHubKusamaSubmitExtrinsic3356195;
const getStorage = () => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('Option<Raw>', '0x00'));
const chainType = () => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('ChainType', {
    Live: null,
}));
const properties = () => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('ChainProperties', {
    ss58Format: '2',
    tokenDecimals: '12',
    tokenSymbol: 'KSM',
}));
const getFinalizedHead = () => Promise.resolve().then(() => _1.blockHash3356195);
const health = () => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('Health', '0x7a000000000000000001'));
const localListenAddresses = () => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('Vec<Text>', localListenAddresses_1.localListenAddressesHex));
const nodeRoles = () => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('Vec<NodeRole>', '0x0400'));
const localPeerId = () => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('Text', '12D3KooWA88bs6zSQmvvTvwqgW8RDFos7KsJrfCAXjm9QyDESgtU'));
const assetHubKusamaPendingExtrinsics3356195 = () => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('Vec<Extrinsic>'));
exports.assetHubKusamaPendingExtrinsics3356195 = assetHubKusamaPendingExtrinsics3356195;
const assetHubKusamaTx3356195 = () => registries_1.assetHubKusamaRegistryV1000000.createType('Extrinsic', _1.balancesTransferValid);
exports.assetHubKusamaTx3356195 = assetHubKusamaTx3356195;
const traceBlock = () => Promise.resolve().then(() => registries_1.assetHubKusamaRegistryV1000000.createType('TraceBlockResponse', traceBlock_json_1.default.result));
/**
 * Deafult Mock polkadot-js ApiPromise. Values are largely meant to be accurate for block
 * #3356195, which is what most Service unit tests are based on.
 */
exports.mockAssetHubKusamaApiBlock3356195 = {
    runtimeVersion,
    call: {
        transactionPaymentApi: {
            queryInfo: exports.assetHubKusamaQueryInfoCall3356195,
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
                maxBlock: registries_1.assetHubKusamaRegistryV1000000.createType('u64', 15),
                perClass: mockApi_1.defaultMockApi.consts.system.blockWeights.perClass,
            },
        },
        transactionPayment: {
            operationalFeeMultiplier: new bn_js_1.default(5),
        },
    },
    createType: registries_1.assetHubKusamaRegistryV1000000.createType.bind(registries_1.assetHubKusamaRegistryV1000000),
    registry: registries_1.assetHubKusamaRegistryV1000000,
    tx: mockDispatchablesData_1.getPalletDispatchables,
    runtimeMetadata: assetHubKusamaMetadataV1000000_1.assetHubKusamaV1000000,
    rpc: {
        chain: {
            getHeader,
            getBlock: exports.assetHubKusamaGetBlock3356195,
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
            queryInfo: exports.assetHubKusamaQueryInfoAt3356195,
            queryFeeDetails,
        },
        author: {
            assetHubKusamaSubmitExtrinsic3356195: exports.assetHubKusamaSubmitExtrinsic3356195,
            assetHubKusamaPendingExtrinsics3356195: exports.assetHubKusamaPendingExtrinsics3356195,
        },
    },
    derive: {
        chain: {
            getHeader: deriveGetHeader,
            getBlock: exports.assetHubKusamaDeriveGetBlock3356195,
        },
    },
    query: {
        nominationPools: {
            metadata: mockNonimationPoolResponseData_1.getMetadata,
        },
    },
};
//# sourceMappingURL=mockAssetHubKusamaApiBlock3356195.js.map