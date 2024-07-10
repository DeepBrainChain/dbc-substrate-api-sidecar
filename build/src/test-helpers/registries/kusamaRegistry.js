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
exports.kusamRegistryV2025 = exports.kusamaRegistry = void 0;
const types_1 = require("@polkadot/types");
const types_2 = require("@polkadot/types");
const types_known_1 = require("@polkadot/types-known");
const kusamaV2008Metadata_1 = require("../metadata/kusamaV2008Metadata");
/**
 * Create a type registry for Kusama.
 * Useful for creating types in order to facilitate testing.
 *
 * N.B. This should deprecated since it does not set chain properties.
 * It is still here because it has users.
 */
function createKusamaRegistryDeprecated() {
    const registry = new types_2.TypeRegistry();
    registry.register((0, types_known_1.getSpecTypes)(registry, 'Kusama', 'kusama', 2008));
    registry.setMetadata(new types_1.Metadata(registry, kusamaV2008Metadata_1.kusamaMetadataV2008));
    return registry;
}
/**
 * Create a type registry for Kusama.
 * Useful for creating types in order to facilitate testing.
 *
 * @param specVersion Kusama runtime spec version to get type defs for.
 */
function createKusamaRegistry(specVersion) {
    const registry = new types_2.TypeRegistry();
    registry.setChainProperties(registry.createType('ChainProperties', {
        ss58Format: 2,
        tokenDecimals: 12,
        tokenSymbol: 'KSM',
    }));
    registry.register((0, types_known_1.getSpecTypes)(registry, 'Kusama', 'kusama', specVersion));
    registry.setMetadata(new types_1.Metadata(registry, kusamaV2008Metadata_1.kusamaMetadataV2008));
    return registry;
}
/**
 * Kusama v2008 TypeRegistry.
 */
exports.kusamaRegistry = createKusamaRegistryDeprecated();
/**
 *  Kusama v2025 TypeRegistry.
 */
exports.kusamRegistryV2025 = createKusamaRegistry(2025);
//# sourceMappingURL=kusamaRegistry.js.map