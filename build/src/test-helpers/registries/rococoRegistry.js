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
exports.rococoRegistry = void 0;
const types_1 = require("@polkadot/types");
const types_2 = require("@polkadot/types");
const types_known_1 = require("@polkadot/types-known");
const rococoMetadata_1 = require("../metadata/rococoMetadata");
/**
 * Create a type registry for Rococo.
 * Useful for creating types in order to facilitate testing.
 */
function createRococoRegistry() {
    const registry = new types_2.TypeRegistry();
    registry.register((0, types_known_1.getSpecTypes)(registry, 'Rococo', 'rococo', 228));
    registry.setMetadata(new types_1.Metadata(registry, rococoMetadata_1.rococoMetadataV228));
    return registry;
}
/**
 * Rococo v228 TypeRegistry.
 */
exports.rococoRegistry = createRococoRegistry();
//# sourceMappingURL=rococoRegistry.js.map