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
const version_json_1 = __importDefault(require("../test-helpers/responses/node/version.json"));
const _1 = require(".");
const nodeVersionService = new _1.NodeVersionService(mock_1.defaultMockApi);
describe('NodeVersionService', () => {
    describe('fetchVersion', () => {
        it('works when ApiPromise works', async () => {
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(await nodeVersionService.fetchVersion())).toStrictEqual(version_json_1.default);
        });
    });
});
//# sourceMappingURL=NodeVersionService.spec.js.map