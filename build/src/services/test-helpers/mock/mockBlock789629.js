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
exports.mockForkedBlock789629 = exports.blockHash789629 = exports.mockBlock789629 = void 0;
const registries_1 = require("../../../test-helpers/registries");
const block789629_json_1 = __importDefault(require("./data/block789629.json"));
const blocks789629Fork_json_1 = __importDefault(require("./data/blocks789629Fork.json"));
/**
 * Mock for polkadot block #789629.
 */
exports.mockBlock789629 = registries_1.polkadotRegistry.createType('Block', block789629_json_1.default);
/**
 * BlockHash for polkadot block #789629.
 */
exports.blockHash789629 = registries_1.polkadotRegistry.createType('BlockHash', '0x7b713de604a99857f6c25eacc115a4f28d2611a23d9ddff99ab0e4f1c17a8578');
/**
 * Mock for polkadot forked block #789629.
 */
exports.mockForkedBlock789629 = registries_1.polkadotRegistry.createType('Block', blocks789629Fork_json_1.default);
//# sourceMappingURL=mockBlock789629.js.map