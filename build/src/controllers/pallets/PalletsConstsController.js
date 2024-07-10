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
 * `/pallets/{palletId}/consts`
 *
 * Returns the metadata for each constant item of the pallet.
 *
 * `/pallets/{palletId}/consts/{constantItemId}`
 *
 * Returns the info for the constantItemId.
 *
 * See `docs/src/openapi-v1.yaml` for usage information.
 */
class PalletsConstantsController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/pallets/:palletId/consts', new services_1.PalletsConstantsService(api));
        this.getConstById = async ({ query: { at, metadata }, params: { palletId, constantItemId } }, res) => {
            const metadataArg = metadata === 'true';
            const hash = await this.getHashFromAt(at);
            const historicApi = await this.api.at(hash);
            PalletsConstantsController.sanitizedSend(res, await this.service.fetchConstantItem(historicApi, {
                hash,
                // stringCamelCase ensures we don't have snake case or kebab case
                palletId: (0, util_1.stringCamelCase)(palletId),
                constantItemId: (0, util_1.stringCamelCase)(constantItemId),
                metadata: metadataArg,
            }));
        };
        this.getConsts = async ({ params: { palletId }, query: { at, onlyIds } }, res) => {
            const onlyIdsArg = onlyIds === 'true';
            const hash = await this.getHashFromAt(at);
            const historicApi = await this.api.at(hash);
            PalletsConstantsController.sanitizedSend(res, await this.service.fetchConstants(historicApi, {
                hash,
                palletId: (0, util_1.stringCamelCase)(palletId),
                onlyIds: onlyIdsArg,
            }));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.safeMountAsyncGetHandlers([
            ['/:constantItemId', this.getConstById],
            ['/', this.getConsts],
        ]);
    }
}
exports.default = PalletsConstantsController;
//# sourceMappingURL=PalletsConstsController.js.map