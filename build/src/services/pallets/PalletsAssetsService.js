"use strict";
// Copyright 2017-2023 Parity Technologies (UK) Ltd.
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
exports.PalletsAssetsService = void 0;
const AbstractService_1 = require("../AbstractService");
class PalletsAssetsService extends AbstractService_1.AbstractService {
    constructor(api) {
        super(api);
    }
    /**
     * Fetch an asset's `AssetDetails` and `AssetMetadata` with its `AssetId`.
     *
     * @param hash `BlockHash` to make call at
     * @param assetId `AssetId` used to get info and metadata for an asset
     */
    async fetchAssetById(hash, assetId) {
        const { api } = this;
        const [{ number }, assetInfo, assetMetaData] = await Promise.all([
            api.rpc.chain.getHeader(hash),
            api.query.assets.asset(assetId),
            api.query.assets.metadata(assetId),
        ]);
        const at = {
            hash,
            height: number.unwrap().toString(10),
        };
        return {
            at,
            assetInfo,
            assetMetaData,
        };
    }
}
exports.PalletsAssetsService = PalletsAssetsService;
//# sourceMappingURL=PalletsAssetsService.js.map