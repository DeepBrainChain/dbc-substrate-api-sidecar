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
exports.blockHash13641102 = exports.mockBlock13641102 = void 0;
const registries_1 = require("../../../test-helpers/registries");
const blocks13641102_json_1 = __importDefault(require("./data/blocks13641102.json"));
/**
 * Mock for polkadot block #13641102.
 */
exports.mockBlock13641102 = registries_1.polkadotRegistryV9300.createType('Block', blocks13641102_json_1.default);
/**
 * BlockHash for polkadot block #13641102.
 */
exports.blockHash13641102 = registries_1.polkadotRegistryV9300.createType('BlockHash', '0x18707858d4a24cf7235d4e1b45ab1665e61050d01a8a01397f3423ffd6937655');
//# sourceMappingURL=mockBlock13641102.js.map