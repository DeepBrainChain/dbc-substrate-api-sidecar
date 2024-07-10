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
 * GET information about the Substrates node's implementation and versioning.
 *
 * Returns:
 * - `clientVersion`: Node binary version.
 * - `clientImplName`: Node's implementation name.
 * - `chain`: Node's chain name.
 */
class NodeVersionController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/node/version', new services_1.NodeVersionService(api));
        /**
         * GET information about the Substrates node's implementation and versioning.
         *
         * @param _req Express Request
         * @param res Express Response
         */
        this.getNodeVersion = async (_req, res) => {
            NodeVersionController.sanitizedSend(res, await this.service.fetchVersion());
        };
        this.initRoutes();
    }
    initRoutes() {
        this.safeMountAsyncGetHandlers([['', this.getNodeVersion]]);
    }
}
exports.default = NodeVersionController;
//# sourceMappingURL=NodeVersionController.js.map