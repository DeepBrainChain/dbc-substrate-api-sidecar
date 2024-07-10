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
exports.internalErrorMiddleware = void 0;
const http_errors_1 = require("http-errors");
const Log_1 = require("../../logging/Log");
/**
 * The last backstop for errors that do not conform to one of Sidecars error
 * format. Used to create a standardized 500 error instead of relying on express.
 *
 * @param exception any
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
const internalErrorMiddleware = (exception, _req, res, next) => {
    // If express has started writing the response, we must default to the
    // built in express error handler in order to close the connection.
    if (res.headersSent) {
        return next(exception);
    }
    const message = new http_errors_1.InternalServerError('Internal Error');
    Log_1.Log.logger.error({ code: 500, message });
    res.status(500).send(message);
};
exports.internalErrorMiddleware = internalErrorMiddleware;
//# sourceMappingURL=internalErrorMiddleware.js.map