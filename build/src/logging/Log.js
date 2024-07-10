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
exports.Log = void 0;
const winston_1 = require("winston");
const SidecarConfig_1 = require("../SidecarConfig");
const transports_1 = require("./transports");
/**
 * Access a singleton winston.Logger that will be intialized on first use.
 */
class Log {
    static create() {
        if (this._logger) {
            return this._logger;
        }
        this._transports = [(0, transports_1.consoleTransport)()];
        /**
         * By default this will be false unless specified as an ENV var.
         */
        if (SidecarConfig_1.SidecarConfig.config.LOG.WRITE) {
            this._transports.push((0, transports_1.fileTransport)('logs.log'));
        }
        this._logger = (0, winston_1.createLogger)({
            transports: this._transports,
            exitOnError: false,
            exceptionHandlers: this._transports,
        });
        return this._logger;
    }
    /**
     * Sidecar's winston.Logger.
     */
    static get logger() {
        return this._logger || this.create();
    }
}
exports.Log = Log;
//# sourceMappingURL=Log.js.map