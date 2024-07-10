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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@polkadot/util");
const services_1 = require("../../services");
const AbstractController_1 = __importDefault(require("../AbstractController"));
class PalletsEventsController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/pallets/:palletId/events', new services_1.PalletsEventsService(api));
        this.getEventById = async ({ query: { at, metadata }, params: { palletId, eventItemId } }, res) => {
            const metadataArg = metadata === 'true';
            const hash = await this.getHashFromAt(at);
            const historicApi = await this.api.at(hash);
            PalletsEventsController.sanitizedSend(res, await this.service.fetchEventItem(historicApi, {
                hash,
                // stringCamelCase ensures we don't have snake case or kebab case
                palletId: (0, util_1.stringCamelCase)(palletId),
                eventItemId: (0, util_1.stringCamelCase)(eventItemId),
                metadata: metadataArg,
            }));
        };
        this.getEvents = async ({ params: { palletId }, query: { at, onlyIds } }, res) => {
            const onlyIdsArg = onlyIds === 'true';
            const hash = await this.getHashFromAt(at);
            const historicApi = await this.api.at(hash);
            PalletsEventsController.sanitizedSend(res, await this.service.fetchEvents(historicApi, {
                hash,
                palletId: (0, util_1.stringCamelCase)(palletId),
                onlyIds: onlyIdsArg,
            }));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.safeMountAsyncGetHandlers([
            ['/:eventItemId', this.getEventById],
            ['/', this.getEvents],
        ]);
    }
}
exports.default = PalletsEventsController;
//# sourceMappingURL=PalletsEventsController.js.map