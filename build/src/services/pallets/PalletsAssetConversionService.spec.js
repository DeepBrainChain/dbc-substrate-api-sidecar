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
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const sanitizeNumbers_1 = require("../../sanitize/sanitizeNumbers");
const assetHubWestendMetadata_1 = require("../../test-helpers/metadata/assetHubWestendMetadata");
const assetHubWestendRegistry_1 = require("../../test-helpers/registries/assetHubWestendRegistry");
const typeFactory_1 = require("../../test-helpers/typeFactory");
const mock_1 = require("../test-helpers/mock");
const assetConversionEntries_1 = require("../test-helpers/mock/data/assetConversionEntries");
const PalletsAssetConversionService_1 = require("./PalletsAssetConversionService");
const assetHubWestendApi = (0, typeFactory_1.createApiWithAugmentations)(assetHubWestendMetadata_1.assetHubWestendMetadataRpcV9435);
function key(multilocation, storageEntry) {
    const native = multilocation[0];
    const asset = multilocation[1];
    const id = [native, asset];
    const key = new types_1.StorageKey(assetHubWestendRegistry_1.assetHubWestendRegistryV9435, storageEntry.key(id));
    return key.setMeta(storageEntry.creator.meta);
}
const poolId0 = key(assetConversionEntries_1.reserves[12], assetHubWestendApi.query.assetConversion.pools);
const poolId1 = key(assetConversionEntries_1.reserves[11], assetHubWestendApi.query.assetConversion.pools);
const poolId2 = key(assetConversionEntries_1.reserves[10], assetHubWestendApi.query.assetConversion.pools);
const poolId3 = key(assetConversionEntries_1.reserves[9], assetHubWestendApi.query.assetConversion.pools);
const poolId4 = key(assetConversionEntries_1.reserves[8], assetHubWestendApi.query.assetConversion.pools);
const poolId5 = key(assetConversionEntries_1.reserves[7], assetHubWestendApi.query.assetConversion.pools);
const poolId6 = key(assetConversionEntries_1.reserves[6], assetHubWestendApi.query.assetConversion.pools);
const poolId7 = key(assetConversionEntries_1.reserves[5], assetHubWestendApi.query.assetConversion.pools);
const poolId8 = key(assetConversionEntries_1.reserves[4], assetHubWestendApi.query.assetConversion.pools);
const poolId9 = key(assetConversionEntries_1.reserves[3], assetHubWestendApi.query.assetConversion.pools);
const poolId10 = key(assetConversionEntries_1.reserves[2], assetHubWestendApi.query.assetConversion.pools);
const poolId11 = key(assetConversionEntries_1.reserves[1], assetHubWestendApi.query.assetConversion.pools);
const poolId12 = key(assetConversionEntries_1.reserves[0], assetHubWestendApi.query.assetConversion.pools);
const poolEntries = () => Promise.resolve().then(() => {
    const options = [];
    for (let i = 13; i > 0; i--) {
        options.push(assetHubWestendRegistry_1.assetHubWestendRegistryV9435.createType('Option<u32>', i - 1));
    }
    const entries = [
        [poolId12, { lpToken: options[0] }],
        [poolId11, { lpToken: options[1] }],
        [poolId10, { lpToken: options[2] }],
        [poolId9, { lpToken: options[3] }],
        [poolId8, { lpToken: options[4] }],
        [poolId7, { lpToken: options[5] }],
        [poolId6, { lpToken: options[6] }],
        [poolId5, { lpToken: options[7] }],
        [poolId4, { lpToken: options[8] }],
        [poolId3, { lpToken: options[9] }],
        [poolId2, { lpToken: options[10] }],
        [poolId1, { lpToken: options[11] }],
        [poolId0, { lpToken: options[12] }],
    ];
    return entries;
});
const nextPoolAssetIdAt = () => Promise.resolve().then(() => assetHubWestendRegistry_1.assetHubWestendRegistryV9435.createType('Option<u32>', '12'));
const mockHistoricApi = {
    registry: assetHubWestendRegistry_1.assetHubWestendRegistryV9435,
};
const mockApi = {
    ...mock_1.mockAssetHubWestendApi,
    at: (_hash) => mockHistoricApi,
    query: {
        assetConversion: {
            nextPoolAssetId: nextPoolAssetIdAt,
            pools: {
                entries: poolEntries,
            },
        },
    },
};
const palletsAssetConversionService = new PalletsAssetConversionService_1.PalletsAssetConversionService(mockApi);
describe('PalletsAssetConversionService', () => {
    describe('PalletsAssetConversionService.fetchNextAvailableId', () => {
        it('Should return the correct response for a LiquidityPoolId', async () => {
            const expectedResponse = {
                at: {
                    hash: '0x270c4262eacfd16f05a63ef36eeabf165abbc3a4c53d0480f5460e6d5b2dc8b5',
                    height: '5236177',
                },
                poolId: '12',
            };
            const response = await palletsAssetConversionService.fetchNextAvailableId(mock_1.blockHash5236177);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toStrictEqual(expectedResponse);
        });
    });
    describe('PalletsAssetConversionService.fetchLiquidityPools', () => {
        it('Should return the correct response for the existing assetPools', async () => {
            const expectedResponse = {
                at: {
                    hash: '0x270c4262eacfd16f05a63ef36eeabf165abbc3a4c53d0480f5460e6d5b2dc8b5',
                    height: '5236177',
                },
                pools: [
                    {
                        reserves: [
                            {
                                parents: '0',
                                interior: {
                                    here: null,
                                },
                            },
                            {
                                parents: '0',
                                interior: {
                                    x2: [
                                        {
                                            palletInstance: '50',
                                        },
                                        {
                                            generalIndex: '47',
                                        },
                                    ],
                                },
                            },
                        ],
                        lpToken: {
                            lpToken: '12',
                        },
                    },
                    {
                        reserves: [
                            {
                                parents: '0',
                                interior: {
                                    here: null,
                                },
                            },
                            {
                                parents: '0',
                                interior: {
                                    x2: [
                                        {
                                            palletInstance: '50',
                                        },
                                        {
                                            generalIndex: '1',
                                        },
                                    ],
                                },
                            },
                        ],
                        lpToken: {
                            lpToken: '11',
                        },
                    },
                    {
                        reserves: [
                            {
                                parents: '0',
                                interior: {
                                    here: null,
                                },
                            },
                            {
                                parents: '0',
                                interior: {
                                    x2: [
                                        {
                                            palletInstance: '50',
                                        },
                                        {
                                            generalIndex: '46',
                                        },
                                    ],
                                },
                            },
                        ],
                        lpToken: {
                            lpToken: '10',
                        },
                    },
                    {
                        reserves: [
                            {
                                parents: '0',
                                interior: {
                                    here: null,
                                },
                            },
                            {
                                parents: '0',
                                interior: {
                                    x2: [
                                        {
                                            palletInstance: '50',
                                        },
                                        {
                                            generalIndex: '30',
                                        },
                                    ],
                                },
                            },
                        ],
                        lpToken: {
                            lpToken: '9',
                        },
                    },
                    {
                        reserves: [
                            {
                                parents: '0',
                                interior: {
                                    here: null,
                                },
                            },
                            {
                                parents: '0',
                                interior: {
                                    x2: [
                                        {
                                            palletInstance: '50',
                                        },
                                        {
                                            generalIndex: '32',
                                        },
                                    ],
                                },
                            },
                        ],
                        lpToken: {
                            lpToken: '8',
                        },
                    },
                    {
                        reserves: [
                            {
                                parents: '0',
                                interior: {
                                    here: null,
                                },
                            },
                            {
                                parents: '0',
                                interior: {
                                    x2: [
                                        {
                                            palletInstance: '50',
                                        },
                                        {
                                            generalIndex: '4',
                                        },
                                    ],
                                },
                            },
                        ],
                        lpToken: {
                            lpToken: '7',
                        },
                    },
                    {
                        reserves: [
                            {
                                parents: '0',
                                interior: {
                                    here: null,
                                },
                            },
                            {
                                parents: '0',
                                interior: {
                                    x2: [
                                        {
                                            palletInstance: '50',
                                        },
                                        {
                                            generalIndex: '45',
                                        },
                                    ],
                                },
                            },
                        ],
                        lpToken: {
                            lpToken: '6',
                        },
                    },
                    {
                        reserves: [
                            {
                                parents: '0',
                                interior: {
                                    here: null,
                                },
                            },
                            {
                                parents: '2',
                                interior: {
                                    x1: {
                                        globalConsensus: { polkadot: null },
                                    },
                                },
                            },
                        ],
                        lpToken: {
                            lpToken: '5',
                        },
                    },
                    {
                        reserves: [
                            {
                                parents: '0',
                                interior: {
                                    here: null,
                                },
                            },
                            {
                                parents: '0',
                                interior: {
                                    x2: [
                                        {
                                            palletInstance: '50',
                                        },
                                        {
                                            generalIndex: '2511',
                                        },
                                    ],
                                },
                            },
                        ],
                        lpToken: {
                            lpToken: '4',
                        },
                    },
                    {
                        reserves: [
                            {
                                parents: '0',
                                interior: {
                                    here: null,
                                },
                            },
                            {
                                parents: '0',
                                interior: {
                                    x2: [
                                        {
                                            palletInstance: '50',
                                        },
                                        {
                                            generalIndex: '19801204',
                                        },
                                    ],
                                },
                            },
                        ],
                        lpToken: {
                            lpToken: '3',
                        },
                    },
                    {
                        reserves: [
                            {
                                parents: '0',
                                interior: {
                                    here: null,
                                },
                            },
                            {
                                parents: '0',
                                interior: {
                                    x2: [
                                        {
                                            palletInstance: '50',
                                        },
                                        {
                                            generalIndex: '1114',
                                        },
                                    ],
                                },
                            },
                        ],
                        lpToken: {
                            lpToken: '2',
                        },
                    },
                    {
                        reserves: [
                            {
                                parents: '0',
                                interior: {
                                    here: null,
                                },
                            },
                            {
                                parents: '0',
                                interior: {
                                    x2: [
                                        {
                                            palletInstance: '50',
                                        },
                                        {
                                            generalIndex: '8',
                                        },
                                    ],
                                },
                            },
                        ],
                        lpToken: {
                            lpToken: '1',
                        },
                    },
                    {
                        reserves: [
                            {
                                parents: '0',
                                interior: {
                                    here: null,
                                },
                            },
                            {
                                parents: '2',
                                interior: {
                                    x1: {
                                        globalConsensus: { polkadot: null },
                                    },
                                },
                            },
                        ],
                        lpToken: {
                            lpToken: '0',
                        },
                    },
                ],
            };
            const response = await palletsAssetConversionService.fetchLiquidityPools(mock_1.blockHash5236177);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response.pools)).toStrictEqual(expectedResponse.pools);
        });
    });
});
//# sourceMappingURL=PalletsAssetConversionService.spec.js.map