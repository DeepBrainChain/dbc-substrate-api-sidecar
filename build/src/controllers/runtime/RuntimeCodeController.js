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
/**
 * Get the Wasm code blob of the Substrate runtime.
 *
 * Query:
 * - (Optional)`at`: Block at which to retrieve runtime version information at. Block
 * 		identifier, as the block height or block hash. Defaults to most recent block.
 *
 * Returns:
 * - `at`: Block number and hash at which the call was made.
 * - `code`: Runtime code Wasm blob.
 */
class RuntimeCodeController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/runtime/code', new services_1.RuntimeCodeService(api));
        /**
         * Get the chain's latest metadata in a decoded, JSON format.
         *
         * @param _req Express Request
         * @param res Express Response
         */
        this.getCodeAtBlock = async ({ query: { at } }, res) => {
            const hash = await this.getHashFromAt(at);
            RuntimeCodeController.sanitizedSend(res, await this.service.fetchCode(hash));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.safeMountAsyncGetHandlers([['', this.getCodeAtBlock]]);
    }
}
exports.default = RuntimeCodeController;
//# sourceMappingURL=RuntimeCodeController.js.map