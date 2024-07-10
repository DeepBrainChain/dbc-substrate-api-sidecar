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
exports.TransactionMaterialService = void 0;
const types_1 = require("@polkadot/types");
const http_errors_1 = require("http-errors");
const AbstractService_1 = require("../AbstractService");
class TransactionMaterialService extends AbstractService_1.AbstractService {
    /**
     * Fetch all the network information needed to construct a transaction offline.
     *
     * @param hash `BlockHash` to make call at
     */
    async fetchTransactionMaterial(hash, metadataArg) {
        const { api } = this;
        if (!metadataArg) {
            const [header, genesisHash, name, version] = await Promise.all([
                api.rpc.chain.getHeader(hash),
                api.rpc.chain.getBlockHash(0),
                api.rpc.system.chain(),
                api.rpc.state.getRuntimeVersion(hash),
            ]);
            const at = {
                hash,
                height: header.number.toNumber().toString(10),
            };
            return {
                at,
                genesisHash,
                chainName: name.toString(),
                specName: version.specName.toString(),
                specVersion: version.specVersion,
                txVersion: version.transactionVersion,
            };
        }
        const [header, metadata, genesisHash, name, version] = await Promise.all([
            api.rpc.chain.getHeader(hash),
            api.rpc.state.getMetadata(hash),
            api.rpc.chain.getBlockHash(0),
            api.rpc.system.chain(),
            api.rpc.state.getRuntimeVersion(hash),
        ]);
        const at = {
            hash,
            height: header.number.toNumber().toString(10),
        };
        const formattedMeta = metadataArg === 'scale' ? metadata.toHex() : metadata.toJSON();
        return {
            at,
            genesisHash,
            chainName: name.toString(),
            specName: version.specName.toString(),
            specVersion: version.specVersion,
            txVersion: version.transactionVersion,
            metadata: formattedMeta,
        };
    }
    /**
     * Fetch all the network information needed to construct a transaction offline.
     *
     * @param hash `BlockHash` to make call at
     */
    async fetchTransactionMaterialwithVersionedMetadata(apiAt, hash, metadataArg, metadataVersion) {
        const { api } = this;
        const [header, genesisHash, name, version] = await Promise.all([
            api.rpc.chain.getHeader(hash),
            api.rpc.chain.getBlockHash(0),
            api.rpc.system.chain(),
            api.rpc.state.getRuntimeVersion(hash),
        ]);
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
        const at = {
            hash,
            height: header.number.toNumber().toString(10),
        };
        const formattedMeta = metadataArg === 'scale' ? metadata.toString() : metadataVersioned.toJSON();
        return {
            at,
            genesisHash,
            chainName: name.toString(),
            specName: version.specName.toString(),
            specVersion: version.specVersion,
            txVersion: version.transactionVersion,
            metadata: formattedMeta,
        };
    }
}
exports.TransactionMaterialService = TransactionMaterialService;
//# sourceMappingURL=TransactionMaterialService.js.map