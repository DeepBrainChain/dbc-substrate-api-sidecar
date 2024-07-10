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
exports.httpErrorMiddleware = void 0;
const http_errors_1 = require("http-errors");
const Log_1 = require("../../logging/Log");
const parseArgs_1 = require("../../parseArgs");
const metrics_1 = require("../../util/metrics");
/**
 * Handle HttpError instances.
 *
 * Should be put before middleware that handles Error, since HttpError
 * inherits from Error.
 *
 * @param exception unknown
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
const httpErrorMiddleware = (err, _req, res, next) => {
    if (res.headersSent || !(err instanceof http_errors_1.HttpError)) {
        return next(err);
    }
    const args = (0, parseArgs_1.parseArgs)();
    const code = err.status;
    const info = {
        code,
        message: err.message,
        stack: err.stack,
    };
    if (args.prometheus) {
        metrics_1.httpErrorCounter.inc();
    }
    Log_1.Log.logger.error(info);
    res.status(code).send(info);
};
exports.httpErrorMiddleware = httpErrorMiddleware;
//# sourceMappingURL=httpErrorMiddleware.js.map