"use strict";
// Copyright 2017-2023 Parity Technologies (UK) Ltd.
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
const sanitizeNumbers_1 = require("../../sanitize/sanitizeNumbers");
const mock_1 = require("../test-helpers/mock");
const mockAssetHubWestendData_1 = require("../test-helpers/mock/assets/mockAssetHubWestendData");
const PalletsPoolAssetsService_1 = require("./PalletsPoolAssetsService");
const mockApi = {
    ...mock_1.mockAssetHubWestendApi,
    query: {
        poolAssets: {
            asset: mockAssetHubWestendData_1.poolAssetsInfo,
            approvals: mockAssetHubWestendData_1.poolAssetApprovals,
            account: mockAssetHubWestendData_1.poolAssetsAccount,
            metadata: mockAssetHubWestendData_1.poolAssetsMetadata,
        },
    },
};
const palletsPoolAssetsService = new PalletsPoolAssetsService_1.PalletsPoolAssetsService(mockApi);
describe('PalletsPoolAssetsService', () => {
    describe('PalletsPoolAssetsService.fetchPoolAssetById', () => {
        it('Should return the correct response for a Pool AssetId', async () => {
            const expectedResponse = {
                at: {
                    hash: '0x270c4262eacfd16f05a63ef36eeabf165abbc3a4c53d0480f5460e6d5b2dc8b5',
                    height: '5236177',
                },
                poolAssetInfo: {
                    owner: '5D8Rj3PcZaTDETw2tK67APJVXEubgo7du83kaFXvju3ASToj',
                    issuer: '5D8Rj3PcZaTDETw2tK67APJVXEubgo7du83kaFXvju3ASToj',
                    admin: '5D8Rj3PcZaTDETw2tK67APJVXEubgo7du83kaFXvju3ASToj',
                    freezer: '5D8Rj3PcZaTDETw2tK67APJVXEubgo7du83kaFXvju3ASToj',
                    supply: '48989794',
                    deposit: '0',
                    minBalance: '1',
                    isSufficient: false,
                    accounts: '2',
                    sufficients: '0',
                    approvals: '0',
                    status: 'Live',
                },
                poolAssetMetaData: {
                    deposit: '0',
                    name: '0x',
                    symbol: '0x',
                    decimals: '0',
                    isFrozen: false,
                },
            };
            const response = await palletsPoolAssetsService.fetchPoolAssetById(mock_1.blockHash5236177, 21);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toStrictEqual(expectedResponse);
        });
    });
});
//# sourceMappingURL=PalletsPoolAssetsService.spec.js.map