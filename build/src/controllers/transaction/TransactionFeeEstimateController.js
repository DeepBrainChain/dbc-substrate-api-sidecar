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
 * POST a serialized transaction and receive a fee estimate.
 *
 * Post info:
 * - `data`: Expects a hex-encoded transaction, e.g. '{"tx": "0x..."}'.
 * - `headers`: Expects 'Content-Type: application/json'.
 *
 * Returns:
 * - Success:
 *   - `weight`: Extrinsic weight.
 *   - `class`: Extrinsic class, one of 'Normal', 'Operational', or 'Mandatory'.
 *   - `partialFee`: _Expected_ inclusion fee for the transaction. Note that the fee rate changes
 *     up to 30% in a 24 hour period and this will not be the exact fee.
 * - Failure:
 *   - `error`: Error description.
 *   - `extrinsic`: The extrinsic and reference block hash.
 *   - `cause`: Error message from the client.
 *
 * Note: `partialFee` does not include any tips that you may add to increase a transaction's
 * priority. See the reference on `compute_fee`.
 *
 * Substrate Reference:
 * - `RuntimeDispatchInfo`: https://crates.parity.io/pallet_transaction_payment_rpc_runtime_api/struct.RuntimeDispatchInfo.html
 * - `query_info`: https://crates.parity.io/pallet_transaction_payment/struct.Module.html#method.query_info
 * - `compute_fee`: https://crates.parity.io/pallet_transaction_payment/struct.Module.html#method.compute_fee
 */
class TransactionFeeEstimateController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/transaction/fee-estimate', new services_1.TransactionFeeEstimateService(api));
        /**
         * Submit a serialized transaction in order to receive an estimate for its
         * partial fees.
         *
         * @param req Sidecar TxRequest
         * @param res Express Response
         */
        this.txFeeEstimate = async ({ body: { tx } }, res) => {
            if (!tx) {
                throw {
                    error: 'Missing field `tx` on request body.',
                };
            }
            const hash = await this.api.rpc.chain.getFinalizedHead();
            TransactionFeeEstimateController.sanitizedSend(res, await this.service.fetchTransactionFeeEstimate(hash, tx));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(this.path, TransactionFeeEstimateController.catchWrap(this.txFeeEstimate));
    }
}
exports.default = TransactionFeeEstimateController;
//# sourceMappingURL=TransactionFeeEstimateController.js.map