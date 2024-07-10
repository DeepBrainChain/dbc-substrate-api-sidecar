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
exports.blockHash523510 = exports.mockBlock523510 = void 0;
const registries_1 = require("../../../test-helpers/registries");
const block523510_json_1 = __importDefault(require("./data/block523510.json"));
/**
 * Mock for Asset Hub Kusama Block #523510.
 */
exports.mockBlock523510 = registries_1.assetHubKusamaRegistryV9430.createType('Block', block523510_json_1.default);
/**
 * BlockHash for Asset Hub Kusama Block #523510.
 */
exports.blockHash523510 = registries_1.assetHubKusamaRegistryV9430.createType('BlockHash', '0x814bb69eba28cf13066aa025d39526b503fc563162f1301c627548b9ccec54c8');
//# sourceMappingURL=mockBlock523510.js.map