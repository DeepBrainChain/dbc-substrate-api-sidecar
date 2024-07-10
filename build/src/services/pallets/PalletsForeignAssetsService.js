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
exports.PalletsForeignAssetsService = void 0;
const AbstractService_1 = require("../AbstractService");
class PalletsForeignAssetsService extends AbstractService_1.AbstractService {
    constructor(api) {
        super(api);
    }
    /**
     * Fetch all foreign asset's `AssetDetails` and `AssetMetadata`.
     *
     * @param hash `BlockHash` to make call at
     */
    async fetchForeignAssets(hash) {
        const { api } = this;
        const [{ number }, foreignAssetInfo] = await Promise.all([
            api.rpc.chain.getHeader(hash),
            api.query.foreignAssets.asset.entries(),
        ]);
        const items = [];
        /**
         * This will iterate through all the foreign asset entries and for each entry it will create
         * the `foreignAssetMultiLocation` variable based on the MultiLocation of the foreign asset.
         * This variable will then be used as the key to get the corresponding metadata of the foreign asset.
         *
         * This is based on the logic implemented by marshacb in asset-transfer-api-registry
         * https://github.com/paritytech/asset-transfer-api-registry/blob/main/src/createRegistry.ts#L193-L238
         */
        for (const [assetStorageKeyData, assetInfo] of foreignAssetInfo) {
            const foreignAssetData = assetStorageKeyData.toHuman();
            if (foreignAssetData) {
                // remove any commas from multilocation key values e.g. Parachain: 2,125 -> Parachain: 2125
                const foreignAssetMultiLocationStr = JSON.stringify(foreignAssetData[0]).replace(/(\d),/g, '$1');
                const assetMetadata = await api.query.foreignAssets.metadata(JSON.parse(foreignAssetMultiLocationStr));
                if (assetInfo.isSome) {
                    items.push({
                        foreignAssetInfo: assetInfo.unwrap(),
                        foreignAssetMetadata: assetMetadata,
                    });
                }
                else {
                    items.push({
                        foreignAssetInfo: {},
                        foreignAssetMetadata: assetMetadata,
                    });
                }
            }
        }
        const at = {
            hash,
            height: number.unwrap().toString(10),
        };
        return {
            at,
            items,
        };
    }
}
exports.PalletsForeignAssetsService = PalletsForeignAssetsService;
//# sourceMappingURL=PalletsForeignAssetsService.js.map