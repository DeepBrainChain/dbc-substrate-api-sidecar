"use strict";
// Copyright 2017-2024 Parity Technologies (UK) Ltd.
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
exports.blockHash6202603 = exports.mockBlock6202603 = void 0;
const registries_1 = require("../../../test-helpers/registries");
const block6202603_json_1 = __importDefault(require("./data/block6202603.json"));
/**
 * Mock for Asset Hub Kusama Block #6202603.
 */
exports.mockBlock6202603 = registries_1.assetHubKusamaRegistryV1000000b.createType('Block', block6202603_json_1.default);
/**
 * BlockHash for Asset Hub Kusama Block #6202603.
 */
exports.blockHash6202603 = registries_1.assetHubKusamaRegistryV1000000b.createType('BlockHash', '0xc94967e879d161868328c382911620b6ee6ae8687d907012f2d1ef4c18371c62');
//# sourceMappingURL=mockBlock6202603.js.map