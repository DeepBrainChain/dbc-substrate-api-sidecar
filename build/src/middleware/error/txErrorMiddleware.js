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
exports.txErrorMiddleware = void 0;
const Log_1 = require("../../logging/Log");
const errors_1 = require("../../types/errors");
/**
 * Handle errors from transaction POST methods
 *
 * @param exception unknown
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
const txErrorMiddleware = (err, _req, res, next) => {
    if (res.headersSent || !(0, errors_1.isTxLegacyError)(err)) {
        return next(err);
    }
    const { code, error, data, cause, stack, transaction, at } = err;
    const info = {
        code,
        error,
        data,
        transaction,
        cause,
        stack,
        at,
    };
    Log_1.Log.logger.error({
        ...info,
        message: `${error}\n Cause: ${cause}\n Transaction: ${transaction}`,
    });
    res.status(code).send(info);
};
exports.txErrorMiddleware = txErrorMiddleware;
//# sourceMappingURL=txErrorMiddleware.js.map