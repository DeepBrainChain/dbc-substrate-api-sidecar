"use strict";
// Copyright 2017-2024 Parity Technologies (UK) Ltd.
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
class AccountsProxyInfoController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/accounts/:address/proxy-info', new services_1.AccountsProxyInfoService(api));
        /**
         * Get the latest account balance summary of `address`.
         *
         * @param req Express Request
         * @param res Express Response
         */
        this.getAccountProxyInfo = async ({ params: { address }, query: { at } }, res) => {
            const hash = await this.getHashFromAt(at);
            AccountsProxyInfoController.sanitizedSend(res, await this.service.fetchAccountProxyInfo(hash, address));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.use(this.path, middleware_1.validateAddress);
        this.safeMountAsyncGetHandlers([['', this.getAccountProxyInfo]]);
    }
}
exports.default = AccountsProxyInfoController;
//# sourceMappingURL=AccountsProxyInfoController.js.map