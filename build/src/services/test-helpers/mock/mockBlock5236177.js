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
exports.blockHash5236177 = exports.mockBlock5236177 = void 0;
const registries_1 = require("../../../test-helpers/registries");
const block5236177_json_1 = __importDefault(require("./data/block5236177.json"));
/**
 * Mock for Asset Hub Westend Block #5236177.
 */
exports.mockBlock5236177 = registries_1.assetHubWestendRegistryV9435.createType('Block', block5236177_json_1.default);
/**
 * BlockHash for Asset Hub Westend Block #5236177.
 */
exports.blockHash5236177 = registries_1.assetHubWestendRegistryV9435.createType('BlockHash', '0x270c4262eacfd16f05a63ef36eeabf165abbc3a4c53d0480f5460e6d5b2dc8b5');
//# sourceMappingURL=mockBlock5236177.js.map