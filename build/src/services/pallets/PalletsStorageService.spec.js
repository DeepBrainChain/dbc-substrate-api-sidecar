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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sanitize_1 = require("../../sanitize");
const registries_1 = require("../../test-helpers/registries");
const mock_1 = require("../test-helpers/mock");
const fetchStorage789629_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchStorage789629.json"));
const fetchStorageIdsOnly789629_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchStorageIdsOnly789629.json"));
const fetchStorageItem789629_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchStorageItem789629.json"));
const PalletsStorageService_1 = require("./PalletsStorageService");
const referendumInfoOfAt = () => Promise.resolve().then(() => {
    registries_1.polkadotRegistry.createType('ReferendumInfo');
});
const mockHistoricApi = {
    registry: registries_1.polkadotRegistry,
    query: {
        democracy: {
            referendumInfoOf: referendumInfoOfAt,
        },
    },
};
const mockApi = {
    ...mock_1.defaultMockApi,
    at: (_hash) => mockHistoricApi,
};
/**
 * Mock PalletsStorageService instance.
 */
const palletsStorageService = new PalletsStorageService_1.PalletsStorageService(mockApi);
describe('PalletStorageService', () => {
    describe('fetchStorageItem', () => {
        it('works with a query to a single key storage map', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsStorageService.fetchStorageItem(mockHistoricApi, {
                hash: mock_1.blockHash789629,
                palletId: 'democracy',
                storageItemId: 'referendumInfoOf',
                keys: ['0'],
                metadata: false,
            }))).toMatchObject(fetchStorageItem789629_json_1.default);
        });
        it('works with a index identifier', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsStorageService.fetchStorageItem(mockHistoricApi, {
                hash: mock_1.blockHash789629,
                palletId: '15',
                storageItemId: 'referendumInfoOf',
                keys: ['0'],
                metadata: false,
            }))).toMatchObject(fetchStorageItem789629_json_1.default);
        });
        it('appropriately uses metadata params', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsStorageService.fetchStorageItem(mockHistoricApi, {
                hash: mock_1.blockHash789629,
                palletId: 'democracy',
                storageItemId: 'referendumInfoOf',
                keys: ['0'],
                metadata: true,
            }))).toMatchObject(fetchStorageItem789629_json_1.default);
        });
    });
    describe('fetchStorage', () => {
        it('works with no query params', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsStorageService.fetchStorage(mockHistoricApi, {
                hash: mock_1.blockHash789629,
                palletId: 'democracy',
                onlyIds: false,
            }))).toStrictEqual(fetchStorage789629_json_1.default);
        });
        it('work with a index identifier', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsStorageService.fetchStorage(mockHistoricApi, {
                hash: mock_1.blockHash789629,
                palletId: '15',
                onlyIds: false,
            }))).toStrictEqual(fetchStorage789629_json_1.default);
        });
        it('only list storage item ids when onlyIds is true', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsStorageService.fetchStorage(mockHistoricApi, {
                hash: mock_1.blockHash789629,
                palletId: 'democracy',
                onlyIds: true,
            }))).toStrictEqual(fetchStorageIdsOnly789629_json_1.default);
        });
    });
});
//# sourceMappingURL=PalletsStorageService.spec.js.map