"use strict";
// Copyright 2017-2022 Parity Technologies (UK) Ltd.
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
const AccountsAssetsService_1 = require("./AccountsAssetsService");
const historicApi = {
    query: {
        assets: {
            account: mockAssetData_1.assetsAccount,
            approvals: mockAssetData_1.assetApprovals,
            asset: (0, mockAssetData_1.assetsInfoKeysInjected)(),
            metadata: mockAssetData_1.assetsMetadata,
        },
    },
};
const mockApi = {
    ...mock_1.defaultMockApi,
    at: (_hash) => historicApi,
};
const accountsAssetsService = new AccountsAssetsService_1.AccountsAssetsService(mockApi);
describe('AccountsAssetsService', () => {
    const at = {
        hash: '0x7b713de604a99857f6c25eacc115a4f28d2611a23d9ddff99ab0e4f1c17a8578',
        height: '789629',
    };
    describe('AccountsAssetsService.fetchAssetBalances', () => {
        it('Should return the correct response with the assets param', async () => {
            const expectedResponse = {
                at,
                assets: [
                    {
                        assetId: '10',
                        balance: '10000000',
                        isFrozen: false,
                        isSufficient: true,
                    },
                    {
                        assetId: '20',
                        balance: '20000000',
                        isFrozen: true,
                        isSufficient: true,
                    },
                ],
            };
            const response = await accountsAssetsService.fetchAssetBalances(mock_1.blockHash789629, '0xffff', // AccountId arg here does not affect the test results
            [10, 20]);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toStrictEqual(expectedResponse);
        });
        it('Should return the correct response without the assets param', async () => {
            const expectedResponse = {
                at,
                assets: [
                    {
                        assetId: '10',
                        balance: '10000000',
                        isFrozen: false,
                        isSufficient: true,
                    },
                    {
                        assetId: '20',
                        balance: '20000000',
                        isFrozen: true,
                        isSufficient: true,
                    },
                    {
                        assetId: '30',
                        balance: '20000000',
                        isFrozen: false,
                        isSufficient: false,
                    },
                ],
            };
            const response = await accountsAssetsService.fetchAssetBalances(mock_1.blockHash789629, '0xffff', // AccountId arg here does not affect the test results
            []);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toStrictEqual(expectedResponse);
        });
    });
    describe('AccountsAssetsService.fetchAssetApproval', () => {
        it('Should return the correct response', async () => {
            const expectedResponse = {
                at,
                amount: '10000000',
                deposit: '2000000',
            };
            const response = await accountsAssetsService.fetchAssetApproval(mock_1.blockHash789629, '', // AccountId arg here does not affect the test results
            10, '');
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toStrictEqual(expectedResponse);
        });
    });
});
//# sourceMappingURL=AccountsAssetsService.spec.js.map