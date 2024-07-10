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
const http_errors_1 = __importDefault(require("http-errors"));
const http_errors_2 = require("http-errors");
const httpErrorMiddleware_1 = require("./httpErrorMiddleware");
const testTools_1 = require("./testTools");
const httpErrorMiddlewareCallsNextWithErr = (0, testTools_1.callsNextWithErr)(httpErrorMiddleware_1.httpErrorMiddleware);
const httpErrorMiddlewareCatchesErrWithStatus = (0, testTools_1.catchesErrWithStatus)(httpErrorMiddleware_1.httpErrorMiddleware);
describe('httpErrorMiddleware', () => {
    // Necessary since the consolveOverride is called after the getter for the logger is launced
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => ({}));
    });
    httpErrorMiddlewareCallsNextWithErr('Error', new Error('This is an error'));
    httpErrorMiddlewareCallsNextWithErr('IBasicError', {
        error: 'basic error',
    });
    httpErrorMiddlewareCallsNextWithErr('ILegacyError', {
        error: 'legacy error',
        statusCode: 500,
    });
    httpErrorMiddlewareCallsNextWithErr('ITxLegacyError', {
        data: 'tx could not be processed',
        cause: 'unknown',
        error: 'tx error',
    });
    httpErrorMiddlewareCallsNextWithErr('nonsense object', {
        veryImportantMessage: 'NOT',
    });
    httpErrorMiddlewareCatchesErrWithStatus('HttpErrorConstructor 404', (0, http_errors_1.default)(404, 'http error!'), 404);
    httpErrorMiddlewareCatchesErrWithStatus('BadRequest', new http_errors_2.BadRequest('bad request'), 400);
    httpErrorMiddlewareCatchesErrWithStatus('InternalServerError', new http_errors_2.InternalServerError('internal error'), 500);
    (0, testTools_1.callsNextWithSentHeaders)(httpErrorMiddleware_1.httpErrorMiddleware, new http_errors_2.InternalServerError('internal error'));
});
//# sourceMappingURL=httpErrorMiddleware.spec.js.map