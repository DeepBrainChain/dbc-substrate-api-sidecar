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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = exports.EtheuremAddressNotSupported = void 0;
const util_crypto_1 = require("@polkadot/util-crypto");
const http_errors_1 = require("http-errors");
class EtheuremAddressNotSupported extends Error {
    constructor(msg) {
        super(`Etheurem addresses may not be supported on this network: ${msg}`);
        this.expose = true;
        this.status = 400;
        this.statusCode = 400;
        this.name = EtheuremAddressNotSupported.name;
    }
}
exports.EtheuremAddressNotSupported = EtheuremAddressNotSupported;
class AbstractService {
    constructor(api) {
        this.api = api;
    }
    /**
     * Process metadata documention.
     *
     * @param docs metadata doucumentation array
     */
    sanitizeDocs(docs) {
        return docs.map((l, idx, arr) => (idx === arr.length - 1 ? l.toString() : `${l.toString()}\n`)).join('');
    }
    /**
     * Returns HttpError with the correct err message for querying accounts balances.
     *
     * @function
     * @param {string} address Address that was queried
     * @param {Error} err Error returned from the promise
     * @returns {HttpError}
     */
    createHttpErrorForAddr(address, err) {
        if ((0, util_crypto_1.isEthereumAddress)(address)) {
            return new EtheuremAddressNotSupported(err.message);
        }
        return new http_errors_1.BadRequest(err.message);
    }
}
exports.AbstractService = AbstractService;
//# sourceMappingURL=AbstractService.js.map