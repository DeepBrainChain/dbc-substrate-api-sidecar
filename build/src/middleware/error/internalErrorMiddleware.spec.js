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
const internalErrorMiddleware_1 = require("./internalErrorMiddleware");
const testTools_1 = require("./testTools");
const internalErrorMiddlewareCatchesErrWithResponse = (0, testTools_1.catchesErrWithResponse)(internalErrorMiddleware_1.internalErrorMiddleware);
describe('internalErrorMiddleware', () => {
    // Necessary since the consolveOverride is called after the getter for the logger is launced
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => ({}));
    });
    internalErrorMiddlewareCatchesErrWithResponse('ITxLegacyError', {
        data: 'tx could not be processed',
        cause: 'unknown',
        error: 'tx error',
    }, 500, new http_errors_1.InternalServerError('Internal Error'));
    internalErrorMiddlewareCatchesErrWithResponse('IBasicError', {
        error: 'basic error',
    }, 500, new http_errors_1.InternalServerError('Internal Error'));
    internalErrorMiddlewareCatchesErrWithResponse('ILegacyError', {
        error: 'Server refuses to brew coffee.',
        statusCode: 418,
    }, 500, new http_errors_1.InternalServerError('Internal Error'));
    internalErrorMiddlewareCatchesErrWithResponse('Error', new Error('This is an error'), 500, new http_errors_1.InternalServerError('Internal Error'));
    internalErrorMiddlewareCatchesErrWithResponse('BadRequest', new http_errors_1.BadRequest('bad request'), 500, new http_errors_1.InternalServerError('Internal Error'));
    internalErrorMiddlewareCatchesErrWithResponse('InternalServerError', new http_errors_1.InternalServerError('internal error'), 500, new http_errors_1.InternalServerError('Internal Error'));
    internalErrorMiddlewareCatchesErrWithResponse('HttpErrorConstructor 404', (0, http_errors_2.default)(404, 'http error!'), 500, new http_errors_1.InternalServerError('Internal Error'));
    internalErrorMiddlewareCatchesErrWithResponse('string', 'hello', 500, new http_errors_1.InternalServerError('Internal Error'));
    internalErrorMiddlewareCatchesErrWithResponse('null', null, 500, new http_errors_1.InternalServerError('Internal Error'));
    internalErrorMiddlewareCatchesErrWithResponse('undefined', undefined, 500, new http_errors_1.InternalServerError('Internal Error'));
    internalErrorMiddlewareCatchesErrWithResponse('-1', -1, 500, new http_errors_1.InternalServerError('Internal Error'));
    internalErrorMiddlewareCatchesErrWithResponse('random object', { brawndo: 'got what plants crave' }, 500, new http_errors_1.InternalServerError('Internal Error'));
    (0, testTools_1.callsNextWithSentHeaders)(internalErrorMiddleware_1.internalErrorMiddleware, [{ err: 'its got electrolyte' }]);
});
//# sourceMappingURL=internalErrorMiddleware.spec.js.map