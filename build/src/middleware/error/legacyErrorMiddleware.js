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
exports.legacyErrorMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_errors_2 = require("http-errors");
const Log_1 = require("../../logging/Log");
const errors_1 = require("../../types/errors");
/**
 * Handle errors of an older format and prior to the introduction of http-error.
 *
 * @param err any
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
const legacyErrorMiddleware = (err, _req, res, next) => {
    if (res.headersSent || !(0, errors_1.isBasicLegacyError)(err)) {
        return next(err);
    }
    if ((0, errors_1.isLegacyError)(err)) {
        const info = {
            code: err.statusCode,
            message: (0, http_errors_1.default)(err.statusCode, err.error),
        };
        Log_1.Log.logger.error(info);
        res.status(err.statusCode).send(info.message);
        return;
    }
    res.status(500).send(new http_errors_2.InternalServerError(err.error));
};
exports.legacyErrorMiddleware = legacyErrorMiddleware;
//# sourceMappingURL=legacyErrorMiddleware.js.map