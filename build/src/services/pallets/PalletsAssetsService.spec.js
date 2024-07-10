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
const mockAssetData_1 = require("../test-helpers/mock/assets/mockAssetData");
const PalletsAssetsService_1 = require("./PalletsAssetsService");
const mockApi = {
    ...mock_1.defaultMockApi,
    query: {
        assets: {
            asset: mockAssetData_1.assetsInfo,
            approvals: mockAssetData_1.assetApprovals,
            account: mockAssetData_1.assetsAccount,
            metadata: mockAssetData_1.assetsMetadata,
        },
    },
};
const palletsAssetsService = new PalletsAssetsService_1.PalletsAssetsService(mockApi);
describe('PalletsAssetsService', () => {
    describe('PalletsAssetsService.fetchAssetById', () => {
        it('Should return the correct response for an AssetId', async () => {
            const expectedResponse = {
                at: {
                    hash: '0x7b713de604a99857f6c25eacc115a4f28d2611a23d9ddff99ab0e4f1c17a8578',
                    height: '789629',
                },
                assetInfo: {
                    owner: 'D2sNEHKjX2cPiWeLirx6ivWZ4vq3EG2i11ycgL9XpAFu9rS',
                    issuer: 'CaKWz5omakTK7ovp4m3koXrHyHb7NG3Nt7GENHbviByZpKp',
                    admin: 'EwrEKdMm4zBr5GyTeKRNfG5p8Cz5rUQkhagSMbj7SLAGok5',
                    freezer: 'EwrEKdMm4zBr5GyTeKRNfG5p8Cz5rUQkhagSMbj7SLAGok5',
                    supply: '10000000',
                    deposit: '2000000',
                    minBalance: '10000',
                    isSufficient: true,
                    accounts: '10',
                    sufficients: '15',
                    approvals: '20',
                    status: 'Live',
                },
                assetMetaData: {
                    deposit: '2000000',
                    name: '0x73746174656d696e74',
                    symbol: '0x444f54',
                    decimals: '10',
                    isFrozen: false,
                },
            };
            const response = await palletsAssetsService.fetchAssetById(mock_1.blockHash789629, 10);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toStrictEqual(expectedResponse);
        });
    });
});
//# sourceMappingURL=PalletsAssetsService.spec.js.map