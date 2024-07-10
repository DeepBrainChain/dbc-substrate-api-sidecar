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
const services_1 = require("../../services");
const AbstractController_1 = __importDefault(require("../AbstractController"));
class PalletsNominationPoolController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/pallets/nomination-pools', new services_1.PalletsNominationPoolService(api));
        this.getNominationPoolById = async ({ params: { poolId }, query: { at, metadata } }, res) => {
            /**
             * Verify our param `poolId` is an integer represented as a string, and return
             * it as an integer
             */
            const index = this.parseNumberOrThrow(poolId, '`poolId` path param is not a number');
            const metadataArg = metadata === 'true';
            const hash = await this.getHashFromAt(at);
            PalletsNominationPoolController.sanitizedSend(res, await this.service.fetchNominationPoolById(index, hash, metadataArg));
        };
        this.getNominationPoolInfo = async ({ query: { at } }, res) => {
            const hash = await this.getHashFromAt(at);
            PalletsNominationPoolController.sanitizedSend(res, await this.service.fetchNominationPoolInfo(hash));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.safeMountAsyncGetHandlers([
            ['/info', this.getNominationPoolInfo],
            ['/:poolId', this.getNominationPoolById],
        ]);
    }
}
exports.default = PalletsNominationPoolController;
//# sourceMappingURL=PalletsNominationPoolsController.js.map