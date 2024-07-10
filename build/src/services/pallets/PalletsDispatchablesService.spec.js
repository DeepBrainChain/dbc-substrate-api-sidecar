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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sanitize_1 = require("../../sanitize");
const registries_1 = require("../../test-helpers/registries");
const mock_1 = require("../test-helpers/mock");
const fetchDispatchablesOnlyIdsRes_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchDispatchablesOnlyIdsRes.json"));
const fetchDispatchablesRes_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchDispatchablesRes.json"));
const fetchProposeDispatchableItem789629_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchProposeDispatchableItem789629.json"));
const fetchSecondDispatchableItem789629_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchSecondDispatchableItem789629.json"));
const fetchVoteDispatchableItem789629_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchVoteDispatchableItem789629.json"));
const PalletsDispatchablesService_1 = require("./PalletsDispatchablesService");
const referendumInfoOfAt = () => Promise.resolve().then(() => {
    registries_1.polkadotRegistryV9300.createType('ReferendumInfo');
});
const mockHistoricApi = {
    registry: registries_1.polkadotRegistryV9300,
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
 * Mock PalletsDispatchablesService instance.
 */
const palletsDispatchablesService = new PalletsDispatchablesService_1.PalletsDispatchablesService(mockApi);
describe('PalletDispatchablesService', () => {
    describe('fetchDispatchableItem', () => {
        it('works with a query to a single dispatchable item id', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsDispatchablesService.fetchDispatchableItem(mockHistoricApi, {
                hash: mock_1.blockHash13641102,
                palletId: 'democracy',
                dispatchableItemId: 'propose',
                metadata: false,
            }))).toMatchObject(fetchProposeDispatchableItem789629_json_1.default);
        });
        it('works with an index identifier', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsDispatchablesService.fetchDispatchableItem(mockHistoricApi, {
                hash: mock_1.blockHash13641102,
                palletId: '14',
                dispatchableItemId: 'second',
                metadata: false,
            }))).toMatchObject(fetchSecondDispatchableItem789629_json_1.default);
        });
        it('appropriately uses metadata params', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsDispatchablesService.fetchDispatchableItem(mockHistoricApi, {
                hash: mock_1.blockHash13641102,
                palletId: 'democracy',
                dispatchableItemId: 'vote',
                metadata: true,
            }))).toMatchObject(fetchVoteDispatchableItem789629_json_1.default);
        });
    });
    describe('fetchDispatchables', () => {
        it('work with a index identifier', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsDispatchablesService.fetchDispatchables(mockHistoricApi, {
                hash: mock_1.blockHash13641102,
                palletId: '14',
                onlyIds: false,
            }))).toStrictEqual(fetchDispatchablesRes_json_1.default);
        });
        it('only list dispatchable item ids when onlyIds is true', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsDispatchablesService.fetchDispatchables(mockHistoricApi, {
                hash: mock_1.blockHash13641102,
                palletId: 'democracy',
                onlyIds: true,
            }))).toStrictEqual(fetchDispatchablesOnlyIdsRes_json_1.default);
        });
    });
});
//# sourceMappingURL=PalletsDispatchablesService.spec.js.map