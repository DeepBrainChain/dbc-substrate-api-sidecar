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
const accounts_1 = require("../../services/accounts");
const AbstractController_1 = __importDefault(require("../AbstractController"));
class ValidateAddressController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/accounts/:address/validate', new accounts_1.AccountsValidateService(api));
        this.validateAddress = ({ params: { address } }, res) => {
            ValidateAddressController.sanitizedSend(res, this.service.validateAddress(address));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.safeMountAsyncGetHandlers([['', this.validateAddress]]);
    }
}
exports.default = ValidateAddressController;
//# sourceMappingURL=AccountsValidateController.js.map