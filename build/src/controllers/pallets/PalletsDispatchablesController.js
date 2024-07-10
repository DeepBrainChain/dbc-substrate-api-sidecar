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
/**
 * `/pallets/{palletId}/dispatchables`
 *
 * Returns the metadata for each dispatchable item of the pallet.
 *
 * `/pallets/{palletId}/dispatchables/{dispatchableItemId}`
 *
 * Returns the info for the dispatchableItemId.
 *
 * See `docs/src/openapi-v1.yaml` for usage information.
 */
class PalletsDispatchablesController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/pallets/:palletId/dispatchables', new services_1.PalletsDispatchablesService(api));
        /**
         * Note: the `at` parameter is not provided because the call for dispatchables does not exist on the historicApi currently.
         * Support may be added for this in a future update.
         */
        this.getDispatchableById = async ({ query: { metadata }, params: { palletId, dispatchableItemId } }, res) => {
            const at = undefined;
            const hash = await this.getHashFromAt(at);
            const metadataArg = metadata === 'true';
            const historicApi = await this.api.at(hash);
            PalletsDispatchablesController.sanitizedSend(res, await this.service.fetchDispatchableItem(historicApi, {
                hash,
                // stringCamelCase ensures we don't have snake case or kebab case
                palletId: (0, util_1.stringCamelCase)(palletId),
                dispatchableItemId: (0, util_1.stringCamelCase)(dispatchableItemId),
                metadata: metadataArg,
            }));
        };
        /**
         * Note: the `at` parameter is not provided because the call for dispatchables does not exist on the historicApi currently.
         * Support may be added for this in a future update.
         */
        this.getDispatchables = async ({ params: { palletId }, query: { onlyIds } }, res) => {
            const at = undefined;
            const hash = await this.getHashFromAt(at);
            const onlyIdsArg = onlyIds === 'true';
            const historicApi = await this.api.at(hash);
            PalletsDispatchablesController.sanitizedSend(res, await this.service.fetchDispatchables(historicApi, {
                hash,
                palletId: (0, util_1.stringCamelCase)(palletId),
                onlyIds: onlyIdsArg,
            }));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.safeMountAsyncGetHandlers([
            ['/:dispatchableItemId', this.getDispatchableById],
            ['/', this.getDispatchables],
        ]);
    }
}
exports.default = PalletsDispatchablesController;
//# sourceMappingURL=PalletsDispatchablesController.js.map