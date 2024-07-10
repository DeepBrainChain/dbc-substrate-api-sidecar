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
exports.PalletsStorageService = void 0;
const util_1 = require("@polkadot/util");
const sanitizeNumbers_1 = require("../../sanitize/sanitizeNumbers");
const AbstractPalletsService_1 = require("../AbstractPalletsService");
class PalletsStorageService extends AbstractPalletsService_1.AbstractPalletsService {
    async fetchStorageItem(historicApi, { hash, palletId, storageItemId, keys, metadata }) {
        const metadataFieldType = 'storage';
        const chosenMetadata = historicApi.registry.metadata;
        const [palletMeta, palletMetaIdx] = this.findPalletMeta(chosenMetadata, palletId, metadataFieldType);
        const palletName = (0, util_1.stringCamelCase)(palletMeta.name);
        // Even if `storageItemMeta` is not used, we call this function to ensure it exists. The side effects
        // of the storage item not existing are that `getStorageItemMeta` will throw.
        const storageItemMeta = this.findPalletFieldItemMeta(historicApi, palletMeta, storageItemId, metadataFieldType);
        let normalizedStorageItemMeta;
        if (metadata) {
            normalizedStorageItemMeta = this.normalizeStorageItemMeta(storageItemMeta);
        }
        const [value, { number }] = await Promise.all([
            historicApi.query[palletName][storageItemId](...keys),
            this.api.rpc.chain.getHeader(hash),
        ]);
        return {
            at: {
                hash: hash,
                height: number.unwrap().toString(10),
            },
            pallet: palletName,
            palletIndex: palletMetaIdx,
            storageItem: storageItemId,
            keys,
            value,
            metadata: normalizedStorageItemMeta,
        };
    }
    async fetchStorage(historicApi, { hash, palletId, onlyIds }) {
        const metadataFieldType = 'storage';
        const chosenMetadata = historicApi.registry.metadata;
        const [palletMeta, palletMetaIdx] = this.findPalletMeta(chosenMetadata, palletId, metadataFieldType);
        let items;
        if (palletMeta.storage.isNone) {
            items = [];
        }
        else if (onlyIds) {
            items = palletMeta.storage.unwrap().items.map((itemMeta) => itemMeta.name);
        }
        else {
            items = palletMeta.storage.unwrap().items.map((itemMeta) => this.normalizeStorageItemMeta(itemMeta));
        }
        const { number } = await this.api.rpc.chain.getHeader(hash);
        return {
            at: {
                hash: hash,
                height: number.unwrap().toString(10),
            },
            pallet: (0, util_1.stringCamelCase)(palletMeta.name),
            palletIndex: palletMetaIdx,
            items,
        };
    }
    /**
     * Normalize storage item metadata by running it through `sanitizeNumbers` and
     * converting the docs section from an array of strings to a single string
     * joined with new line characters.
     *
     * @param storageItemMeta polkadot-js StorageEntryMetadataV14
     */
    normalizeStorageItemMeta(storageItemMeta) {
        const normalizedStorageItemMeta = (0, sanitizeNumbers_1.sanitizeNumbers)(storageItemMeta);
        normalizedStorageItemMeta.docs = this.sanitizeDocs(storageItemMeta.docs);
        return normalizedStorageItemMeta;
    }
}
exports.PalletsStorageService = PalletsStorageService;
//# sourceMappingURL=PalletsStorageService.js.map