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
const mock_1 = require("../test-helpers/mock");
const code789629_json_1 = __importDefault(require("../test-helpers/responses/runtime/code789629.json"));
const RuntimeCodeService_1 = require("./RuntimeCodeService");
const runtimeCodeService = new RuntimeCodeService_1.RuntimeCodeService(mock_1.defaultMockApi);
describe('RuntimeCodeService', () => {
    describe('fetchCode', () => {
        it('works when ApiPromise works', async () => {
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(await runtimeCodeService.fetchCode(mock_1.blockHash789629))).toStrictEqual(code789629_json_1.default);
        });
    });
});
//# sourceMappingURL=RuntimeCodeService.spec.js.map