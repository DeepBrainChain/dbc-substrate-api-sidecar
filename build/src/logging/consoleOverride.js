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
exports.consoleOverride = void 0;
/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
const util_1 = require("util");
/**
 * Override console methods with a winston.Logger.
 *
 * @param logger
 */
function consoleOverride(logger) {
    [
        ['log', 'info'],
        ['info', 'info'],
        ['warn', 'warn'],
        ['error', 'error'],
        ['debug', 'debug'],
    ].forEach(([consoleLevel, winstonLevel]) => {
        console[consoleLevel] = function (...args) {
            // We typecast here because the typescript compiler is not sure what we are keying into.
            // The type within the logger of any of the following log levels is `LeveledLogMethod`.
            logger[winstonLevel].call(logger, util_1.format.apply(util_1.format, args));
        };
    });
}
exports.consoleOverride = consoleOverride;
//# sourceMappingURL=consoleOverride.js.map