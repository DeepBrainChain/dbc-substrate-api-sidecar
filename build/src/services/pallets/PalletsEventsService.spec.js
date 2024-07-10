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
const http_errors_1 = require("http-errors");
const sanitize_1 = require("../../sanitize");
const registries_1 = require("../../test-helpers/registries");
const mock_1 = require("../test-helpers/mock");
const mockPalletEventsData_1 = require("../test-helpers/mock/data/mockPalletEventsData");
const fetchEventsOnlyIdsRes_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchEventsOnlyIdsRes.json"));
const fetchEventsRes_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchEventsRes.json"));
const fetchExternalTabledEventItem789629_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchExternalTabledEventItem789629.json"));
const fetchProposedEventItem789629_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchProposedEventItem789629.json"));
const fetchTabledEventItem789629_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchTabledEventItem789629.json"));
const PalletsEventsService_1 = require("./PalletsEventsService");
const referendumInfoOfAt = () => Promise.resolve().then(() => {
    registries_1.polkadotRegistryV9300.createType('ReferendumInfo');
});
const mockHistoricApi = {
    registry: registries_1.polkadotRegistryV9300,
    events: mockPalletEventsData_1.getPalletEvents,
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
 * Mock PalletsEventsService instance.
 */
const palletsEventsService = new PalletsEventsService_1.PalletsEventsService(mockApi);
describe('PalletEventsService', () => {
    describe('fetchEventItem', () => {
        it('works with a query to a single error item id', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsEventsService.fetchEventItem(mockHistoricApi, {
                hash: mock_1.blockHash789629,
                palletId: 'democracy',
                eventItemId: 'Proposed',
                metadata: true,
            }))).toMatchObject(fetchProposedEventItem789629_json_1.default);
        });
        it('works with an index identifier', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsEventsService.fetchEventItem(mockHistoricApi, {
                hash: mock_1.blockHash789629,
                palletId: '14',
                eventItemId: 'Tabled',
                metadata: false,
            }))).toMatchObject(fetchTabledEventItem789629_json_1.default);
        });
        it('appropriately uses metadata params', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsEventsService.fetchEventItem(mockHistoricApi, {
                hash: mock_1.blockHash789629,
                palletId: 'democracy',
                eventItemId: 'ExternalTabled',
                metadata: true,
            }))).toMatchObject(fetchExternalTabledEventItem789629_json_1.default);
        });
        it('throws an error when an event id isnt found', async () => {
            expect.assertions(2);
            try {
                (0, sanitize_1.sanitizeNumbers)(await palletsEventsService.fetchEventItem(mockHistoricApi, {
                    hash: mock_1.blockHash789629,
                    palletId: 'democracy',
                    eventItemId: 'IncorrectEventId',
                    metadata: true,
                }));
            }
            catch (error) {
                expect(error).toBeInstanceOf(http_errors_1.InternalServerError);
                expect(error).toEqual(new http_errors_1.InternalServerError(`Could not find events item ("IncorrectEventId") in metadata. events item names are expected to be in camel case, e.g. 'storageItemId'`));
            }
        });
    });
    describe('fetchEvents', () => {
        it('work with a index identifier', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsEventsService.fetchEvents(mockHistoricApi, {
                hash: mock_1.blockHash789629,
                palletId: '14',
                onlyIds: false,
            }))).toStrictEqual(fetchEventsRes_json_1.default);
        });
        it('only list error item ids when onlyIds is true', async () => {
            expect((0, sanitize_1.sanitizeNumbers)(await palletsEventsService.fetchEvents(mockHistoricApi, {
                hash: mock_1.blockHash789629,
                palletId: 'democracy',
                onlyIds: true,
            }))).toStrictEqual(fetchEventsOnlyIdsRes_json_1.default);
        });
    });
});
//# sourceMappingURL=PalletsEventsService.spec.js.map