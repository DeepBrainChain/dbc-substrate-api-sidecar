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
const http_errors_1 = require("http-errors");
const http_errors_2 = __importDefault(require("http-errors"));
const legacyErrorMiddleware_1 = require("./legacyErrorMiddleware");
const testTools_1 = require("./testTools");
const legacyErrorMiddlewareCallsNextWithErr = (0, testTools_1.callsNextWithErr)(legacyErrorMiddleware_1.legacyErrorMiddleware);
const legacyErrorMiddlewareCatchesErrWithResponse = (0, testTools_1.catchesErrWithResponse)(legacyErrorMiddleware_1.legacyErrorMiddleware);
describe('legacyErrorMiddleware', () => {
    // Necessary since the consolveOverride is called after the getter for the logger is launced
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => ({}));
    });
    legacyErrorMiddlewareCallsNextWithErr('Error', new Error('This is an error'));
    legacyErrorMiddlewareCallsNextWithErr('BadRequest', new http_errors_1.BadRequest('bad request'));
    legacyErrorMiddlewareCallsNextWithErr('InternalServerError (http-error which extends Error)', new http_errors_1.InternalServerError('internal error'));
    legacyErrorMiddlewareCallsNextWithErr('nonsense object', {
        veryImportantMessage: 'NOT!',
    });
    legacyErrorMiddlewareCatchesErrWithResponse(
    // Because ITxLegacyError extends IBasicLegacyError, txErrorMiddleware
    // should be put before legacyErrorMiddleware
    'ITxLegacyError (extends IBasicLegacyError)', {
        data: 'tx could not be processed',
        cause: 'unknown',
        error: 'tx error',
    }, 500, new http_errors_1.InternalServerError('tx error'));
    legacyErrorMiddlewareCatchesErrWithResponse('IBasicError', {
        error: 'basic error',
    }, 500, new http_errors_1.InternalServerError('basic error'));
    legacyErrorMiddlewareCatchesErrWithResponse('ILegacyError', {
        error: 'Server refuses to brew coffee.',
        statusCode: 418,
    }, 418, (0, http_errors_2.default)(418, 'Server refuses to brew coffee.'));
    (0, testTools_1.callsNextWithSentHeaders)(legacyErrorMiddleware_1.legacyErrorMiddleware, {
        error: 'Server refuses to brew coffee.',
        statusCode: 418,
    });
});
//# sourceMappingURL=legacyErrorMiddleware.spec.js.map