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
exports.PalletsDispatchablesService = void 0;
const util_1 = require("@polkadot/util");
const AbstractPalletsService_1 = require("../AbstractPalletsService");
class PalletsDispatchablesService extends AbstractPalletsService_1.AbstractPalletsService {
    async fetchDispatchableItem(historicApi, { hash, palletId, dispatchableItemId, metadata }) {
        const metadataFieldType = 'calls';
        const palletMetadata = historicApi.registry.metadata;
        const [palletMeta, palletMetaIdx] = this.findPalletMeta(palletMetadata, palletId, metadataFieldType);
        // Even if `dispatchableItemMetadata` is not used, we call this function to ensure it exists. The side effects
        // of the dispatchable item not existing are that `getDispatchablesItemMeta` will throw.
        const dispatchableItemMetadata = this.findPalletFieldItemMeta(historicApi, palletMeta, dispatchableItemId, metadataFieldType);
        let palletDispatchableMetadata;
        if (metadata) {
            palletDispatchableMetadata = dispatchableItemMetadata[1].meta;
        }
        const { number } = await this.api.rpc.chain.getHeader(hash);
        return {
            at: {
                hash: hash,
                height: number.unwrap().toString(10),
            },
            pallet: (0, util_1.stringCamelCase)(palletMeta.name),
            palletIndex: palletMetaIdx,
            dispatchableItem: dispatchableItemId,
            metadata: palletDispatchableMetadata,
        };
    }
    async fetchDispatchables(historicApi, { hash, palletId, onlyIds }) {
        const metadataFieldType = 'calls';
        const metadata = historicApi.registry.metadata;
        const [palletMeta, palletMetaIdx] = this.findPalletMeta(metadata, palletId, metadataFieldType);
        const { number } = await this.api.rpc.chain.getHeader(hash);
        const parsedPalletName = (0, util_1.stringCamelCase)(palletMeta.name.toString());
        const dispatchables = this.api.tx[parsedPalletName];
        let items;
        if (Object.entries(dispatchables).length === 0) {
            items = [];
        }
        else if (onlyIds) {
            items = Object.entries(dispatchables).map((txItem) => txItem[0]);
        }
        else {
            items = Object.entries(dispatchables).map((dispatchableItem) => dispatchableItem[1].meta);
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
exports.PalletsDispatchablesService = PalletsDispatchablesService;
//# sourceMappingURL=PalletsDispatchablesService.js.map