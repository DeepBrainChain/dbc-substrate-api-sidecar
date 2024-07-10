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
exports.blockHash19772575 = exports.mockBlock19772575 = void 0;
const registries_1 = require("../../../test-helpers/registries");
const block19772575_json_1 = __importDefault(require("./data/block19772575.json"));
/**
 * Mock for Polkadot Block #19772575.
 */
exports.mockBlock19772575 = registries_1.polkadotRegistryV1000001.createType('Block', block19772575_json_1.default);
/**
 * BlockHash for Polkadot Block #19772575.
 */
exports.blockHash19772575 = registries_1.polkadotRegistryV1000001.createType('BlockHash', '0xbbb99b1d43d6c1885e09806e4d8fd3beaa30a87046397e8dfc44ced45ed735a9');
//# sourceMappingURL=mockBlock19772575.js.map