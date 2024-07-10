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
Object.defineProperty(exports, "__esModule", { value: true });
exports.decoratedPolkadotMetadata = exports.decoratedKusamaMetadata = void 0;
const decorate_1 = require("@polkadot/types/metadata/decorate");
const kusamaRegistry_1 = require("../registries/kusamaRegistry");
const polkadotRegistry_1 = require("../registries/polkadotRegistry");
const metadata_1 = require("./metadata");
/**
 * Decorated metadata of the kusamaRegistry (v2008).
 */
exports.decoratedKusamaMetadata = (0, decorate_1.expandMetadata)(kusamaRegistry_1.kusamaRegistry, metadata_1.kusamaMetadata);
/**
 * Decorated metadata of the polkadotRegistry (v16).
 */
exports.decoratedPolkadotMetadata = (0, decorate_1.expandMetadata)(polkadotRegistry_1.polkadotRegistry, metadata_1.polkadotMetadata);
//# sourceMappingURL=decorated.js.map