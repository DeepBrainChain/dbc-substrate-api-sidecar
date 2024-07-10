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
exports.PalletsErrorsService = void 0;
const util_1 = require("@polkadot/util");
const AbstractPalletsService_1 = require("../AbstractPalletsService");
class PalletsErrorsService extends AbstractPalletsService_1.AbstractPalletsService {
    async fetchErrorItem(historicApi, { hash, palletId, errorItemId, metadata }) {
        const metadataFieldType = 'errors';
        const palletMetadata = historicApi.registry.metadata;
        const [palletMeta, palletMetaIdx] = this.findPalletMeta(palletMetadata, palletId, metadataFieldType);
        // Even if `errorItemMetadata` is not used, we call this function to ensure it exists. The side effects
        // of the error item not existing are that `getErrorItemMeta` will throw.
        const errorItemMetadata = this.findPalletFieldItemMeta(historicApi, palletMeta, errorItemId, metadataFieldType);
        let palletErrorMetadata;
        if (metadata) {
            palletErrorMetadata = errorItemMetadata[1].meta;
        }
        const { number } = await this.api.rpc.chain.getHeader(hash);
        return {
            at: {
                hash: hash,
                height: number.unwrap().toString(10),
            },
            pallet: (0, util_1.stringCamelCase)(palletMeta.name),
            palletIndex: palletMetaIdx,
            errorItem: errorItemId,
            metadata: palletErrorMetadata,
        };
    }
    async fetchErrors(historicApi, { hash, palletId, onlyIds }) {
        const metadataFieldType = 'errors';
        const metadata = historicApi.registry.metadata;
        const [palletMeta, palletMetaIdx] = this.findPalletMeta(metadata, palletId, metadataFieldType);
        const { number } = await this.api.rpc.chain.getHeader(hash);
        const parsedPalletName = (0, util_1.stringCamelCase)(palletMeta.name.toString());
        const errors = historicApi.errors[parsedPalletName];
        let items;
        if (palletMeta.errors.isEmpty) {
            items = [];
        }
        else if (onlyIds) {
            items = Object.entries(errors).map((errorItem) => errorItem[0]);
        }
        else {
            items = [];
            for (const [, value] of Object.entries(errors)) {
                const item = value.meta;
                items.push(item);
            }
        }
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
}
exports.PalletsErrorsService = PalletsErrorsService;
//# sourceMappingURL=PalletsErrorsService.js.map