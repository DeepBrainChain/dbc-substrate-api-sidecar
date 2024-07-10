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
const http_errors_1 = require("http-errors");
const testTools_1 = require("./testTools");
const txErrorMiddleware_1 = require("./txErrorMiddleware");
const txErrorMiddlewareCallsNextWithErr = (0, testTools_1.callsNextWithErr)(txErrorMiddleware_1.txErrorMiddleware);
const txErrorMiddlewareCatchesErrWithResponse = (0, testTools_1.catchesErrWithResponse)(txErrorMiddleware_1.txErrorMiddleware);
describe('txErrorMiddleware', () => {
    // Necessary since the consolveOverride is called after the getter for the logger is launced
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => ({}));
    });
    txErrorMiddlewareCallsNextWithErr('Error', new Error('This is an error'));
    txErrorMiddlewareCallsNextWithErr('BadRequest', new http_errors_1.BadRequest('bad request'));
    txErrorMiddlewareCallsNextWithErr('InternalServerError (http-error which extends Error)', new http_errors_1.InternalServerError('internal error'));
    txErrorMiddlewareCallsNextWithErr('nonsense object', {
        cat: 'in a hat',
    });
    txErrorMiddlewareCallsNextWithErr('ILegacyError', {
        error: 'legacy error',
        statusCode: 500,
    });
    txErrorMiddlewareCallsNextWithErr('IBasicError', {
        error: 'basic error',
    });
    txErrorMiddlewareCatchesErrWithResponse('ITxLegacyError (with data)', {
        code: 500,
        data: 'some data!',
        cause: 'a cause!',
        error: 'an error!',
    }, 500, {
        code: 500,
        data: 'some data!',
        cause: 'a cause!',
        error: 'an error!',
    });
    txErrorMiddlewareCatchesErrWithResponse('ITxLegacyError (without data)', {
        code: 500,
        cause: 'a cause!',
        error: 'an error!',
    }, 500, {
        code: 500,
        cause: 'a cause!',
        error: 'an error!',
    });
    (0, testTools_1.callsNextWithSentHeaders)(txErrorMiddleware_1.txErrorMiddleware, {
        data: 'some data!',
        cause: 'a cause!',
        error: 'an error!',
    });
});
//# sourceMappingURL=txErrorMiddleware.spec.js.map