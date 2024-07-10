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
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetHubKusamaRegistryV1000000b = exports.assetHubKusamaRegistryV1000000 = exports.assetHubKusamaRegistryV9430 = void 0;
const types_1 = require("@polkadot/types");
const types_2 = require("@polkadot/types");
const types_known_1 = require("@polkadot/types-known");
const assetHubKusamaMetadata_1 = require("../metadata/assetHubKusamaMetadata");
const assetHubKusamaMetadataV1000000_1 = require("../metadata/assetHubKusamaMetadataV1000000");
const assetHubKusamaMetadataV1000000b_1 = require("../metadata/assetHubKusamaMetadataV1000000b");
/**
 * Create a type registry for Asset Hub Kusama.
 * Useful for creating types in order to facilitate testing.
 *
 * @param specVersion Asset Hub Kusama runtime spec version to get type defs for.
 */
function createAssetHubKusamaRegistry(specVersion, metadata) {
    const registry = new types_2.TypeRegistry();
    registry.setChainProperties(registry.createType('ChainProperties', {
        ss58Format: 2,
        tokenDecimals: 12,
        tokenSymbol: 'KSM',
    }));
    registry.register((0, types_known_1.getSpecTypes)(registry, 'Statemine', 'statemine', specVersion));
    registry.setMetadata(new types_1.Metadata(registry, metadata));
    return registry;
}
/**
 * Asset Hub Kusama v9430 TypeRegistry.
 */
exports.assetHubKusamaRegistryV9430 = createAssetHubKusamaRegistry(9430, assetHubKusamaMetadata_1.assetHubKusamaV14);
/**
 * Asset Hub Kusama v1000000 TypeRegistry.
 */
exports.assetHubKusamaRegistryV1000000 = createAssetHubKusamaRegistry(1000000, assetHubKusamaMetadataV1000000_1.assetHubKusamaV1000000);
/**
 * Asset Hub Kusama v1000000 TypeRegistry for block 6202603 in testing.
 */
exports.assetHubKusamaRegistryV1000000b = createAssetHubKusamaRegistry(1000000, assetHubKusamaMetadataV1000000b_1.assetHubKusamaV1000000b);
//# sourceMappingURL=assetHubKusamaRegistry.js.map