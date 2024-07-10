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
exports.txError = exports.legacyError = exports.internalError = exports.httpError = exports.error = void 0;
var errorMiddleware_1 = require("./errorMiddleware");
Object.defineProperty(exports, "error", { enumerable: true, get: function () { return errorMiddleware_1.errorMiddleware; } });
var httpErrorMiddleware_1 = require("./httpErrorMiddleware");
Object.defineProperty(exports, "httpError", { enumerable: true, get: function () { return httpErrorMiddleware_1.httpErrorMiddleware; } });
var internalErrorMiddleware_1 = require("./internalErrorMiddleware");
Object.defineProperty(exports, "internalError", { enumerable: true, get: function () { return internalErrorMiddleware_1.internalErrorMiddleware; } });
var legacyErrorMiddleware_1 = require("./legacyErrorMiddleware");
Object.defineProperty(exports, "legacyError", { enumerable: true, get: function () { return legacyErrorMiddleware_1.legacyErrorMiddleware; } });
var txErrorMiddleware_1 = require("./txErrorMiddleware");
Object.defineProperty(exports, "txError", { enumerable: true, get: function () { return txErrorMiddleware_1.txErrorMiddleware; } });
//# sourceMappingURL=index.js.map