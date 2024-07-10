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
exports.filterApiRpc = void 0;
const winston_1 = require("winston");
/**
 * Ignore log messages that have `API-WS:`. (e.g. polkadot-js RPC logging)
 */
exports.filterApiRpc = (0, winston_1.format)((info, _opts) => {
    var _a, _b, _c;
    if (!info ||
        (((_a = info === null || info === void 0 ? void 0 : info.message) === null || _a === void 0 ? void 0 : _a.includes) &&
            !((_b = info === null || info === void 0 ? void 0 : info.message) === null || _b === void 0 ? void 0 : _b.includes('connected')) &&
            ((_c = info.message) === null || _c === void 0 ? void 0 : _c.includes('API-WS:')) &&
            info.level === 'info')) {
        return false;
    }
    return info;
});
//# sourceMappingURL=filterApiRpc.js.map