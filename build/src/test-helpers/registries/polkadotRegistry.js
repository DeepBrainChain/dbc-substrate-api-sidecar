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
exports.polkadotRegistryV1000001 = exports.polkadotRegistryV9370 = exports.polkadotRegistryV9300 = exports.polkadotRegistryV9190 = exports.polkadotRegistryV9122 = exports.polkadotRegistryV9110 = exports.polkadotRegistryV29 = exports.polkadotRegistry = void 0;
const types_1 = require("@polkadot/types");
const types_2 = require("@polkadot/types");
const types_known_1 = require("@polkadot/types-known");
const polkadotV16Metadata_1 = require("../metadata/polkadotV16Metadata");
const polkadotV29Metadata_1 = require("../metadata/polkadotV29Metadata");
const polkadotV9110Metadata_1 = require("../metadata/polkadotV9110Metadata");
const polkadotV9122Metadata_1 = require("../metadata/polkadotV9122Metadata");
const polkadotV9190Metadata_1 = require("../metadata/polkadotV9190Metadata");
const polkadotV9300Metadata_1 = require("../metadata/polkadotV9300Metadata");
const polkadotV9370Metadata_1 = require("../metadata/polkadotV9370Metadata");
const polkadotV1000001Metadata_1 = require("../metadata/polkadotV1000001Metadata");
/**
 * Create a type registry for Polkadot.
 * Useful for creating types in order to facilitate testing.
 */
function createPolkadotRegistry(specVersion, metadata) {
    const registry = new types_2.TypeRegistry();
    registry.register((0, types_known_1.getSpecTypes)(registry, 'Polkadot', 'polkadot', specVersion));
    registry.setChainProperties(registry.createType('ChainProperties', {
        ss58Format: 0,
        tokenDecimals: 12,
        tokenSymbol: 'DOT',
    }));
    registry.setMetadata(new types_1.Metadata(registry, metadata));
    return registry;
}
/**
 * Polkadot v16 TypeRegistry.
 */
exports.polkadotRegistry = createPolkadotRegistry(16, polkadotV16Metadata_1.polkadotMetadataRpcV16);
/**
 * Polkadot v29 TypeRegistry
 */
exports.polkadotRegistryV29 = createPolkadotRegistry(29, polkadotV29Metadata_1.polkadotMetadataRpcV29);
/**
 * Polkadot v9110 TypeRegistry
 */
exports.polkadotRegistryV9110 = createPolkadotRegistry(9110, polkadotV9110Metadata_1.polkadotMetadataRpcV9110);
/**
 * Polkadot v9122 TypeRegistry
 */
exports.polkadotRegistryV9122 = createPolkadotRegistry(9122, polkadotV9122Metadata_1.polkadotMetadataRpcV9122);
/**
 * Polkadot v9190 TypeRegistry
 */
exports.polkadotRegistryV9190 = createPolkadotRegistry(9190, polkadotV9190Metadata_1.polkadotMetadataRpcV9190);
/**
 * Polkadot v9300 TypeRegistry
 */
exports.polkadotRegistryV9300 = createPolkadotRegistry(9300, polkadotV9300Metadata_1.polkadotMetadataRpcV9300);
exports.polkadotRegistryV9370 = createPolkadotRegistry(9370, polkadotV9370Metadata_1.polkadotMetadataRpcV9370);
/**
 * Polkadot v1000001 TypeRegistry
 */
exports.polkadotRegistryV1000001 = createPolkadotRegistry(1000001, polkadotV1000001Metadata_1.polkadotMetadataRpcV1000001);
//# sourceMappingURL=polkadotRegistry.js.map