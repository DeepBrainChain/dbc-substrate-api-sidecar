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
exports.validateAddressMiddleware = void 0;
const util_1 = require("@polkadot/util");
const util_crypto_1 = require("@polkadot/util-crypto");
const defaults_1 = require("@polkadot/util-crypto/address/defaults");
const http_errors_1 = require("http-errors");
/**
 * Express Middleware to validate that an `:address` param is properly formatted.
 */
const validateAddressMiddleware = (req, _res, next) => {
    if (!('address' in req.params)) {
        return next();
    }
    const [isValid, error] = checkAddress(req.params.address);
    if (!isValid && error) {
        return next(new http_errors_1.BadRequest(error));
    }
    return next();
};
exports.validateAddressMiddleware = validateAddressMiddleware;
/**
 * Verify that an address is a valid substrate address.
 *
 * Note: this is very similar '@polkadot/util-crypto/address/checkAddress,
 * except it does not check the ss58 prefix and supports H256/H160 raw address.
 *
 * @param address potential ss58 or raw address
 */
function checkAddress(address) {
    let u8Address;
    if ((0, util_1.isHex)(address)) {
        u8Address = Uint8Array.from(Buffer.from(address.slice(2), 'hex'));
    }
    else {
        try {
            u8Address = (0, util_crypto_1.base58Decode)(address);
        }
        catch (error) {
            return [false, error.message];
        }
    }
    if (defaults_1.defaults.allowedEncodedLengths.includes(u8Address.length)) {
        const [isValid] = (0, util_crypto_1.checkAddressChecksum)(u8Address);
        return [isValid, isValid ? undefined : 'Invalid decoded address checksum'];
    }
    if ((0, util_crypto_1.isEthereumAddress)(address)) {
        return [true, undefined];
    }
    return [false, 'Invalid address format'];
}
//# sourceMappingURL=validateAddressMiddleware.js.map