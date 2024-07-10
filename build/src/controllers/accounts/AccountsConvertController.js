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
const http_errors_1 = require("http-errors");
const middleware_1 = require("../../middleware");
const accounts_1 = require("../../services/accounts");
const AbstractController_1 = __importDefault(require("../AbstractController"));
class AccountsConvertController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/accounts/:address/convert', new accounts_1.AccountsConvertService(api));
        this.accountConvert = ({ params: { address }, query: { scheme, prefix, publicKey } }, res) => {
            // Validation of the `scheme` query param
            const cryptoScheme = scheme ? scheme : 'sr25519';
            if (!(cryptoScheme === 'ed25519' || cryptoScheme === 'sr25519' || cryptoScheme === 'ecdsa')) {
                throw new http_errors_1.BadRequest('The `scheme` query parameter provided can be one of the following three values : [ed25519, sr25519, ecdsa]');
            }
            // Validation of the `prefix` query param
            const networkPrefix = prefix ? prefix : '42';
            const ss58Prefix = this.parseNumberOrThrow(networkPrefix, 'The `prefix` query parameter provided is not a number.');
            const pubKey = publicKey === 'true';
            AccountsConvertController.sanitizedSend(res, this.service.accountConvert(address, cryptoScheme, ss58Prefix, pubKey));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.use(this.path, (0, middleware_1.validateBoolean)(['publicKey']));
        this.safeMountAsyncGetHandlers([['', this.accountConvert]]);
    }
}
exports.default = AccountsConvertController;
//# sourceMappingURL=AccountsConvertController.js.map