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
const sanitizeNumbers_1 = require("../../sanitize/sanitizeNumbers");
const mockAssetHubKusamaData_1 = require("../test-helpers/mock/assets/mockAssetHubKusamaData");
const foreignAssetsEntries_1 = require("../test-helpers/mock/data/foreignAssetsEntries");
const mockAssetHubKusamaApi_1 = require("../test-helpers/mock/mockAssetHubKusamaApi");
const mockBlock523510_1 = require("../test-helpers/mock/mockBlock523510");
const PalletsForeignAssetsService_1 = require("./PalletsForeignAssetsService");
const foreignAssetsEntriesAt = () => Promise.resolve().then(() => (0, foreignAssetsEntries_1.foreignAssetsEntries)());
const mockApi = {
    ...mockAssetHubKusamaApi_1.mockAssetHubKusamaApi,
    query: {
        foreignAssets: {
            asset: {
                entries: foreignAssetsEntriesAt,
            },
            metadata: mockAssetHubKusamaData_1.foreignAssetsMetadata,
        },
    },
};
const palletsForeignAssetsService = new PalletsForeignAssetsService_1.PalletsForeignAssetsService(mockApi);
describe('PalletsForeignAssetsService', () => {
    describe('PalletsForeignAssetsService.fetchForeignAssets', () => {
        it('Should return the correct response for Foreign Assets', async () => {
            const expectedResponse = {
                at: {
                    hash: '0x814bb69eba28cf13066aa025d39526b503fc563162f1301c627548b9ccec54c8',
                    height: '523510',
                },
                items: [
                    {
                        foreignAssetInfo: {
                            owner: 'FxqimVubBRPqJ8kTwb3wL7G4q645hEkBEnXPyttLsTrFc5Q',
                            issuer: 'FxqimVubBRPqJ8kTwb3wL7G4q645hEkBEnXPyttLsTrFc5Q',
                            admin: 'FxqimVubBRPqJ8kTwb3wL7G4q645hEkBEnXPyttLsTrFc5Q',
                            freezer: 'FxqimVubBRPqJ8kTwb3wL7G4q645hEkBEnXPyttLsTrFc5Q',
                            supply: '0',
                            deposit: '0',
                            minBalance: '100000000',
                            isSufficient: true,
                            accounts: '0',
                            sufficients: '0',
                            approvals: '0',
                            status: 'Live',
                        },
                        foreignAssetMetadata: {
                            deposit: '0',
                            name: '0x506f6c6b61646f74',
                            symbol: '0x444f54',
                            decimals: '10',
                            isFrozen: false,
                        },
                    },
                    {
                        foreignAssetInfo: {
                            owner: 'FBeL7DiQ6JkoypYATheXhH3GQr5de2L3hL444TP6qQr3yA9',
                            issuer: 'FBeL7DiQ6JkoypYATheXhH3GQr5de2L3hL444TP6qQr3yA9',
                            admin: 'FBeL7DiQ6JkoypYATheXhH3GQr5de2L3hL444TP6qQr3yA9',
                            freezer: 'FBeL7DiQ6JkoypYATheXhH3GQr5de2L3hL444TP6qQr3yA9',
                            supply: '0',
                            deposit: '100000000000',
                            minBalance: '1000000000',
                            isSufficient: false,
                            accounts: '0',
                            sufficients: '0',
                            approvals: '0',
                            status: 'Live',
                        },
                        foreignAssetMetadata: {
                            deposit: '6693666633',
                            name: '0x54696e6b65726e6574',
                            symbol: '0x544e4b52',
                            decimals: '12',
                            isFrozen: false,
                        },
                    },
                ],
            };
            const response = await palletsForeignAssetsService.fetchForeignAssets(mockBlock523510_1.blockHash523510);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toStrictEqual(expectedResponse);
        });
    });
});
//# sourceMappingURL=PalletsForeignAssetsService.spec.js.map