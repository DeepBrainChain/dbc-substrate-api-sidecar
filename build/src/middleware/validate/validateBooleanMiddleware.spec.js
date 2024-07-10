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
const util_1 = require("./util");
const validateBooleanMiddleware_1 = require("./validateBooleanMiddleware");
describe('validateBooleanMiddleware', () => {
    (0, util_1.doesNotErrorWith)('no query params in path', {
        query: {},
    }, (0, validateBooleanMiddleware_1.validateBooleanMiddleware)([]));
    (0, util_1.doesNotErrorWith)('valid true and false query params', {
        query: {
            finalized: 'true',
            eventDocs: 'false',
        },
    }, (0, validateBooleanMiddleware_1.validateBooleanMiddleware)(['finalized', 'eventDocs']));
    (0, util_1.doesNotErrorWith)('Non specified invalid query params', {
        query: {
            invalid: 'truee',
        },
    }, (0, validateBooleanMiddleware_1.validateBooleanMiddleware)([]));
    (0, util_1.errorsWith)('an invalid true query param', {
        query: {
            finalized: 'truee',
        },
    }, new http_errors_1.BadRequest('Query parameter: finalized has an invalid boolean value of truee'), (0, validateBooleanMiddleware_1.validateBooleanMiddleware)(['finalized']));
    (0, util_1.errorsWith)('an invalid false query param', {
        query: {
            finalized: 'falsee',
        },
    }, new http_errors_1.BadRequest('Query parameter: finalized has an invalid boolean value of falsee'), (0, validateBooleanMiddleware_1.validateBooleanMiddleware)(['finalized']));
    (0, util_1.errorsWith)('multiple invalid query params', {
        query: {
            finalized: 'notTrue',
            eventDocs: 'notFalse',
        },
    }, new http_errors_1.BadRequest('Query parameter: finalized has an invalid boolean value of notTrue - Query parameter: eventDocs has an invalid boolean value of notFalse'), (0, validateBooleanMiddleware_1.validateBooleanMiddleware)(['finalized', 'eventDocs']));
});
//# sourceMappingURL=validateBooleanMiddleware.spec.js.map