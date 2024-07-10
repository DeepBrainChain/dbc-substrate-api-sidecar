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
const api_contract_1 = require("@polkadot/api-contract");
const http_errors_1 = require("http-errors");
const middleware_1 = require("../../middleware");
const services_1 = require("../../services");
const AbstractController_1 = __importDefault(require("../AbstractController"));
class ContractsInkController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/contracts/ink/:address', new services_1.ContractsInkService(api));
        /**
         * Send a message call to a contract. It defaults to get if nothing is inputted.
         *
         * @param _req
         * @param res
         */
        this.callContractQuery = async ({ params: { address }, body, query: { method = 'get', gasLimit, storageDepositLimit, args } }, res) => {
            const { api } = this;
            const argsArray = Array.isArray(args) ? args : [];
            const contract = new api_contract_1.ContractPromise(api, body, address);
            if (!contract.query[method]) {
                throw new http_errors_1.BadRequest(`Invalid Method: Contract does not have the given ${method} message.`);
            }
            const callMeta = contract.query[method].meta;
            if (callMeta.isPayable || callMeta.isMutating) {
                throw new http_errors_1.BadRequest(`Invalid Method: This endpoint does not handle mutating or payable calls.`);
            }
            ContractsInkController.sanitizedSend(res, await this.service.fetchContractCall(contract, address, method, argsArray, gasLimit, storageDepositLimit));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.use(this.path, middleware_1.validateAddress);
        this.safeMountAsyncPostHandlers([['/query', this.callContractQuery]]);
    }
}
exports.default = ContractsInkController;
//# sourceMappingURL=ContractsInkController.js.map