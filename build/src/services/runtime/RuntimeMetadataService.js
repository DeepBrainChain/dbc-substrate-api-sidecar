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
exports.RuntimeMetadataService = void 0;
const types_1 = require("@polkadot/types");
const http_errors_1 = require("http-errors");
const AbstractService_1 = require("../AbstractService");
class RuntimeMetadataService extends AbstractService_1.AbstractService {
    /**
     * Fetch `Metadata` in decoded JSON form.
     *
     * @param hash `BlockHash` to make call at
     */
    async fetchMetadata(hash) {
        const { api } = this;
        const metadata = await api.rpc.state.getMetadata(hash);
        return metadata;
    }
    /**
     * Fetch the requested version of `Metadata` in decoded JSON form.
     *
     * @param hash `BlockHash` to make call at
     */
    async fetchMetadataVersioned(apiAt, metadataVersion) {
        let metadata;
        let metadataVersioned;
        try {
            metadata = await apiAt.call.metadata.metadataAtVersion(metadataVersion);
            if (metadata) {
                metadataVersioned = new types_1.Metadata(apiAt.registry, metadata.unwrap());
            }
            else {
                throw new Error(`Metadata for version ${metadataVersion} is not available.`);
            }
        }
        catch {
            throw new http_errors_1.InternalServerError(`An error occured while attempting to fetch ${metadataVersion.toString()} metadata.`);
        }
        return metadataVersioned;
    }
    /**
     * Fetch the available `Metadata` versions.
     *
     * @param hash `BlockHash` to make call at
     */
    async fetchMetadataVersions(hash) {
        const { api } = this;
        const apiAt = await api.at(hash);
        const availableVersions = (await apiAt.call.metadata.metadataVersions()).toHuman();
        return availableVersions;
    }
}
exports.RuntimeMetadataService = RuntimeMetadataService;
//# sourceMappingURL=RuntimeMetadataService.js.map