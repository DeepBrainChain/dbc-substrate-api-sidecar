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
exports.assetHubWestendMetadata = exports.polkadotMetadataV9300 = exports.polkadotMetadataV29 = exports.kusamaMetadata = exports.polkadotMetadata = void 0;
const metadata_1 = require("@polkadot/types/metadata");
const assetHubWestendRegistry_1 = require("../registries/assetHubWestendRegistry");
const kusamaRegistry_1 = require("../registries/kusamaRegistry");
const polkadotRegistry_1 = require("../registries/polkadotRegistry");
const assetHubWestendMetadata_1 = require("./assetHubWestendMetadata");
const kusamaV2008Metadata_1 = require("./kusamaV2008Metadata");
const polkadotV16Metadata_1 = require("./polkadotV16Metadata");
const polkadotV29Metadata_1 = require("./polkadotV29Metadata");
const polkadotV9300Metadata_1 = require("./polkadotV9300Metadata");
/**
 * Metadata of the polkadotRegistry (v16).
 */
exports.polkadotMetadata = new metadata_1.Metadata(polkadotRegistry_1.polkadotRegistry, polkadotV16Metadata_1.polkadotMetadataRpcV16);
/**
 * Metadata of the kusamaRegistry (v2008).
 */
exports.kusamaMetadata = new metadata_1.Metadata(kusamaRegistry_1.kusamaRegistry, kusamaV2008Metadata_1.kusamaMetadataV2008);
/**
 * Metadata of polkadotRegistry (v29)
 */
exports.polkadotMetadataV29 = new metadata_1.Metadata(polkadotRegistry_1.polkadotRegistryV29, polkadotV29Metadata_1.polkadotMetadataRpcV29);
/**
 * Metadata of polkadotRegistry (v9300)
 */
exports.polkadotMetadataV9300 = new metadata_1.Metadata(polkadotRegistry_1.polkadotRegistryV9300, polkadotV9300Metadata_1.polkadotMetadataRpcV9300);
/**
 * Metadata of assetHubWestendRegistry (v9435)
 */
exports.assetHubWestendMetadata = new metadata_1.Metadata(assetHubWestendRegistry_1.assetHubWestendRegistryV9435, assetHubWestendMetadata_1.assetHubWestendMetadataRpcV9435);
//# sourceMappingURL=metadata.js.map