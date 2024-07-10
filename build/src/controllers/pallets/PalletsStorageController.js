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
 * `/pallets/{palletId}/storage`
 *
 * Returns the metadata for each storage item of the pallet.
 *
 * `/pallets/{palletId}/storage/{storageItemId}`
 *
 * Returns the value stored under the storageItemId. If it is a
 * map, query param key1 is required. If the storage item is double map
 * query params key1 and key2 are required.
 *
 * See `docs/src/openapi-v1.yaml` for usage information.
 */
class PalletsStorageController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/pallets/:palletId/storage', new services_1.PalletsStorageService(api));
        this.getStorageItem = async ({ query: { at, keys, metadata }, params: { palletId, storageItemId } }, res) => {
            const parsedKeys = Array.isArray(keys) ? keys : [];
            const metadataArg = metadata === 'true';
            const hash = await this.getHashFromAt(at);
            const historicApi = await this.api.at(hash);
            PalletsStorageController.sanitizedSend(res, await this.service.fetchStorageItem(historicApi, {
                hash,
                // stringCamelCase ensures we don't have snake case or kebab case
                palletId: (0, util_1.stringCamelCase)(palletId),
                storageItemId: (0, util_1.stringCamelCase)(storageItemId),
                keys: parsedKeys,
                metadata: metadataArg,
            }));
        };
        this.getStorage = async ({ params: { palletId }, query: { at, onlyIds } }, res) => {
            const onlyIdsArg = onlyIds === 'true';
            const hash = await this.getHashFromAt(at);
            const historicApi = await this.api.at(hash);
            PalletsStorageController.sanitizedSend(res, await this.service.fetchStorage(historicApi, {
                hash,
                palletId: (0, util_1.stringCamelCase)(palletId),
                onlyIds: onlyIdsArg,
            }));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.safeMountAsyncGetHandlers([
            ['/:storageItemId', this.getStorageItem],
            ['/', this.getStorage],
        ]);
    }
}
exports.default = PalletsStorageController;
//# sourceMappingURL=PalletsStorageController.js.map