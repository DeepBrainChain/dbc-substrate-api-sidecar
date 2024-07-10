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
exports.PalletsConstantsService = void 0;
const util_1 = require("@polkadot/util");
const AbstractPalletsService_1 = require("../AbstractPalletsService");
class PalletsConstantsService extends AbstractPalletsService_1.AbstractPalletsService {
    async fetchConstantItem(historicApi, { hash, palletId, constantItemId, metadata }) {
        const metadataFieldType = 'constants';
        const palletMetadata = historicApi.registry.metadata;
        const [palletMeta, palletMetaIdx] = this.findPalletMeta(palletMetadata, palletId, metadataFieldType);
        // Even if `constantItemMetadata` is not used, we call this function to ensure it exists. The side effects
        // of the constant item not existing are that `getConstItemMeta` will throw.
        const constantItemMetadata = this.findPalletFieldItemMeta(historicApi, palletMeta, constantItemId, metadataFieldType);
        let palletConstantMetadata;
        if (metadata) {
            palletConstantMetadata = constantItemMetadata;
        }
        const { number } = await this.api.rpc.chain.getHeader(hash);
        return {
            at: {
                hash: hash,
                height: number.unwrap().toString(10),
            },
            pallet: (0, util_1.stringCamelCase)(palletMeta.name),
            palletIndex: palletMetaIdx,
            constantsItem: constantItemId,
            metadata: palletConstantMetadata,
        };
    }
    async fetchConstants(historicApi, { hash, palletId, onlyIds }) {
        const metadataFieldType = 'constants';
        const metadata = historicApi.registry.metadata;
        const [palletMeta, palletMetaIdx] = this.findPalletMeta(metadata, palletId, metadataFieldType);
        const { number } = await this.api.rpc.chain.getHeader(hash);
        let items;
        if (palletMeta.constants.isEmpty) {
            items = [];
        }
        else if (onlyIds) {
            items = palletMeta.constants.map((itemMeta) => itemMeta.name);
        }
        else {
            items = palletMeta.constants.map((itemMeta) => itemMeta);
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
exports.PalletsConstantsService = PalletsConstantsService;
//# sourceMappingURL=PalletsConstantsService.js.map