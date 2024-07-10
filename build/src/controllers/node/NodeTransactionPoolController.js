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
const middleware_1 = require("../../middleware");
const services_1 = require("../../services");
const AbstractController_1 = __importDefault(require("../AbstractController"));
/**
 * GET pending extrinsics from the Substrate node.
 *
 * Returns:
 * - `pool`: array of
 * 		- `hash`: H256 hash of the extrinsic.
 * 		- `encodedExtrinsic`: Scale encoded extrinsic.
 * 		- `tip`: Tip included into the extrinsic. Available when the `includeFee` query param is set to true.
 * 		- `priority`: Priority of the transaction. Calculated by tip * (max_block_{weight|length} / bounded_{weight|length}).
 * 			Available when the `includeFee` query param is set to true.
 * 		- `partialFee`: PartialFee for a transaction. Available when the `includeFee` query param is set to true.
 */
class NodeTransactionPoolController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/node/transaction-pool', new services_1.NodeTransactionPoolService(api));
        /**
         * GET pending extrinsics from the Substrate node.
         *
         * @param req Express Request, accepts the query param `includeFee`
         * @param res Express Response
         */
        this.getNodeTransactionPool = async ({ query: { includeFee } }, res) => {
            const shouldIncludeFee = includeFee === 'true';
            NodeTransactionPoolController.sanitizedSend(res, await this.service.fetchTransactionPool(shouldIncludeFee));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.use(this.path, (0, middleware_1.validateBoolean)(['includeFee']));
        this.safeMountAsyncGetHandlers([['', this.getNodeTransactionPool]]);
    }
}
exports.default = NodeTransactionPoolController;
//# sourceMappingURL=NodeTransactionPoolController.js.map