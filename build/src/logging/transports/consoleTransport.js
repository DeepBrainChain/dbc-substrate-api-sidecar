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
exports.consoleTransport = void 0;
const winston_1 = require("winston");
const SidecarConfig_1 = require("../../SidecarConfig");
const transformers_1 = require("../transformers");
/**
 * Console transport for winston logger.
 */
function consoleTransport() {
    const { config: { LOG }, } = SidecarConfig_1.SidecarConfig;
    /**
     * A simple printing format for how `ITransformableInfo` shows up.
     */
    const simplePrint = winston_1.format.printf((info) => {
        if (info === null || info === void 0 ? void 0 : info.stack) {
            // If there is a stack dump (e.g. error middleware), show that in console
            return `${info === null || info === void 0 ? void 0 : info.timestamp} ${info === null || info === void 0 ? void 0 : info.level}: ${info === null || info === void 0 ? void 0 : info.message} \n ${info === null || info === void 0 ? void 0 : info.stack}`;
        }
        return `${info === null || info === void 0 ? void 0 : info.timestamp} ${info === null || info === void 0 ? void 0 : info.level}: ${info === null || info === void 0 ? void 0 : info.message}`;
    });
    const transformers = [(0, transformers_1.stripTimestamp)(), (0, transformers_1.nodeUtilFormat)(), transformers_1.timeStamp];
    if (!LOG.JSON) {
        transformers.push(winston_1.format.colorize(), simplePrint);
    }
    else {
        transformers.push(winston_1.format.prettyPrint());
    }
    if (LOG.STRIP_ANSI) {
        transformers.unshift((0, transformers_1.stripAnsi)());
    }
    if (LOG.FILTER_RPC) {
        transformers.unshift((0, transformers_1.filterApiRpc)());
    }
    return new winston_1.transports.Console({
        level: LOG.LEVEL || 'info',
        handleExceptions: true,
        format: winston_1.format.combine(...transformers),
        // Silence using `jest --silent`
        silent: process.env.NODE_ENV === 'test',
    });
}
exports.consoleTransport = consoleTransport;
//# sourceMappingURL=consoleTransport.js.map