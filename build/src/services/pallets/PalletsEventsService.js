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
exports.PalletsEventsService = void 0;
const util_1 = require("@polkadot/util");
const AbstractPalletsService_1 = require("../AbstractPalletsService");
class PalletsEventsService extends AbstractPalletsService_1.AbstractPalletsService {
    async fetchEventItem(historicApi, { hash, palletId, eventItemId, metadata }) {
        const metadataFieldType = 'events';
        const palletMetadata = historicApi.registry.metadata;
        const [palletMeta, palletMetaIdx] = this.findPalletMeta(palletMetadata, palletId, metadataFieldType);
        // Even if `eventItemMetadata` is not used, we call this function to ensure it exists. The side effects
        // of the event item not existing are that `getEventItemMeta` will throw.
        const eventItemMetadata = this.findPalletFieldItemMeta(historicApi, palletMeta, eventItemId, metadataFieldType);
        let palletEventMetadata;
        if (metadata) {
            palletEventMetadata = eventItemMetadata[1].meta;
        }
        const { number } = await this.api.rpc.chain.getHeader(hash);
        return {
            at: {
                hash: hash,
                height: number.unwrap().toString(10),
            },
            pallet: (0, util_1.stringCamelCase)(palletMeta.name),
            palletIndex: palletMetaIdx,
            eventItem: eventItemId,
            metadata: palletEventMetadata,
        };
    }
    async fetchEvents(historicApi, { hash, palletId, onlyIds }) {
        const metadataFieldType = 'events';
        const metadata = historicApi.registry.metadata;
        const [palletMeta, palletMetaIdx] = this.findPalletMeta(metadata, palletId, metadataFieldType);
        const { number } = await this.api.rpc.chain.getHeader(hash);
        const parsedPalletName = (0, util_1.stringCamelCase)(palletMeta.name.toString());
        const events = historicApi.events[parsedPalletName];
        let items;
        if (palletMeta.events.isEmpty) {
            items = [];
        }
        else if (onlyIds) {
            items = Object.entries(events).map((eventItem) => eventItem[0]);
        }
        else {
            items = Object.entries(events).map((eventItem) => eventItem[1].meta);
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
exports.PalletsEventsService = PalletsEventsService;
//# sourceMappingURL=PalletsEventsService.js.map