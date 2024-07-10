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
const fetchConstantsOnlyIdsRes_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchConstantsOnlyIdsRes.json"));
const fetchConstantsRes_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchConstantsRes.json"));
const fetchEnactmentPeriodConstsItem789629_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchEnactmentPeriodConstsItem789629.json"));
const fetchLaunchPeriodConstsItem789629_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchLaunchPeriodConstsItem789629.json"));
const fetchVotingPeriodConstsItem789629_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchVotingPeriodConstsItem789629.json"));
const PalletsConstantsService_1 = require("./PalletsConstantsService");
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
 * Mock PalletsConstantsService instance.
 */
const palletsConstantsService = new PalletsConstantsService_1.PalletsConstantsService(mockApi);
describe('PalletConstantsService', () => {
    describe('fetchConstantItem', () => {
        it('works with a query to a single constant item id', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsConstantsService.fetchConstantItem(mockHistoricApi, {
                hash: mock_1.blockHash13641102,
                palletId: 'democracy',
                constantItemId: 'EnactmentPeriod',
                metadata: false,
            }))).toMatchObject(fetchEnactmentPeriodConstsItem789629_json_1.default);
        });
        it('works with an index identifier', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsConstantsService.fetchConstantItem(mockHistoricApi, {
                hash: mock_1.blockHash13641102,
                palletId: '14',
                constantItemId: 'LaunchPeriod',
                metadata: false,
            }))).toMatchObject(fetchLaunchPeriodConstsItem789629_json_1.default);
        });
        it('appropriately uses metadata params', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsConstantsService.fetchConstantItem(mockHistoricApi, {
                hash: mock_1.blockHash13641102,
                palletId: 'democracy',
                constantItemId: 'VotingPeriod',
                metadata: true,
            }))).toMatchObject(fetchVotingPeriodConstsItem789629_json_1.default);
        });
    });
    describe('fetchConstants', () => {
        it('works with an index identifier', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsConstantsService.fetchConstants(mockHistoricApi, {
                hash: mock_1.blockHash13641102,
                palletId: '14',
                onlyIds: false,
            }))).toStrictEqual(fetchConstantsRes_json_1.default);
        });
        it('only lists constant item ids when onlyIds is true', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsConstantsService.fetchConstants(mockHistoricApi, {
                hash: mock_1.blockHash13641102,
                palletId: 'democracy',
                onlyIds: true,
            }))).toStrictEqual(fetchConstantsOnlyIdsRes_json_1.default);
        });
    });
});
//# sourceMappingURL=PalletsConstantsService.spec.js.map