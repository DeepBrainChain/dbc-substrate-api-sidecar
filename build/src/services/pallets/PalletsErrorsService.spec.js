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
const mockPalletErrorsData_1 = require("../test-helpers/mock/data/mockPalletErrorsData");
const fetchErrorsOnlyIdsRes_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchErrorsOnlyIdsRes.json"));
const fetchErrorsRes_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchErrorsRes.json"));
const fetchInsufficientFundsErrorItem13641102_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchInsufficientFundsErrorItem13641102.json"));
const fetchProposalMissingErrorItem13641102_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchProposalMissingErrorItem13641102.json"));
const fetchValueLowErrorItem13641102_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchValueLowErrorItem13641102.json"));
const PalletsErrorsService_1 = require("./PalletsErrorsService");
const referendumInfoOfAt = () => Promise.resolve().then(() => {
    registries_1.polkadotRegistryV9300.createType('ReferendumInfo');
});
const mockHistoricApi = {
    registry: registries_1.polkadotRegistryV9300,
    errors: mockPalletErrorsData_1.getPalletErrors,
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
 * Mock PalletsErrorsService instance.
 */
const palletsErrorsService = new PalletsErrorsService_1.PalletsErrorsService(mockApi);
describe('PalletErrorService', () => {
    describe('fetchErrorItem', () => {
        it('works with a query to a single error item id', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsErrorsService.fetchErrorItem(mockHistoricApi, {
                hash: mock_1.blockHash13641102,
                palletId: 'democracy',
                errorItemId: 'ValueLow',
                metadata: false,
            }))).toMatchObject(fetchValueLowErrorItem13641102_json_1.default);
        });
        it('works with an index identifier', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsErrorsService.fetchErrorItem(mockHistoricApi, {
                hash: mock_1.blockHash13641102,
                palletId: '14',
                errorItemId: 'InsufficientFunds',
                metadata: false,
            }))).toMatchObject(fetchInsufficientFundsErrorItem13641102_json_1.default);
        });
        it('appropriately uses metadata params', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsErrorsService.fetchErrorItem(mockHistoricApi, {
                hash: mock_1.blockHash13641102,
                palletId: 'democracy',
                errorItemId: 'ProposalMissing',
                metadata: true,
            }))).toMatchObject(fetchProposalMissingErrorItem13641102_json_1.default);
        });
    });
    describe('fetchErrors', () => {
        it('work with a index identifier', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsErrorsService.fetchErrors(mockHistoricApi, {
                hash: mock_1.blockHash13641102,
                palletId: '14',
                onlyIds: false,
            }))).toStrictEqual(fetchErrorsRes_json_1.default);
        });
        it('only list error item ids when onlyIds is true', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsErrorsService.fetchErrors(mockHistoricApi, {
                hash: mock_1.blockHash13641102,
                palletId: 'democracy',
                onlyIds: true,
            }))).toStrictEqual(fetchErrorsOnlyIdsRes_json_1.default);
        });
    });
});
//# sourceMappingURL=PalletsErrorsService.spec.js.map