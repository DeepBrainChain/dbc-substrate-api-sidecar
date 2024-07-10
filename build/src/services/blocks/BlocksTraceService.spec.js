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
const sanitizeNumbers_1 = require("../../sanitize/sanitizeNumbers");
const registries_1 = require("../../test-helpers/registries");
const mock_1 = require("../test-helpers/mock");
const getKeyNames_1 = require("../test-helpers/mock/data/getKeyNames");
const operations_json_1 = __importDefault(require("../test-helpers/responses/blocks/operations.json"));
const traces_json_1 = __importDefault(require("../test-helpers/responses/blocks/traces.json"));
const BlocksTraceService_1 = require("./BlocksTraceService");
const trace_1 = require("./trace");
/**
 * Save the getKeyNames function reference, so we can point it to a different function
 * for testing and then reassign it back to the original after this test suite is done.
 */
const tempGetKeyNames = trace_1.Trace['getKeyNames'].bind(trace_1.Trace);
/**
 * HistoricApi used in order to create the correct types per the blocks runtime.
 */
const mockHistoricApi = {
    registry: registries_1.kusamRegistryV2025,
};
/**
 * BlocksTraceService mock
 */
const blocksTraceService = new BlocksTraceService_1.BlocksTraceService(mock_1.defaultMockApi);
beforeAll(() => {
    trace_1.Trace['getKeyNames'] = () => getKeyNames_1.keyNames;
});
afterAll(() => {
    // Clean up our test specific overrides
    trace_1.Trace['getKeyNames'] = tempGetKeyNames;
});
describe('BlocksTraceService', () => {
    describe('BlocksTraceService.traces', () => {
        it('works when ApiPromise works', async () => {
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(await blocksTraceService.traces(mock_1.blockHash789629))).toStrictEqual(traces_json_1.default);
        });
    });
    describe('BlocksTraceService.operations', () => {
        it('works when ApiPromise works (without `actions`)', async () => {
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(await blocksTraceService.operations(mock_1.blockHash789629, mockHistoricApi, false))).toMatchObject(operations_json_1.default);
        });
        it.todo('works when ApiPromise works (with `actions`)');
    });
});
//# sourceMappingURL=BlocksTraceService.spec.js.map