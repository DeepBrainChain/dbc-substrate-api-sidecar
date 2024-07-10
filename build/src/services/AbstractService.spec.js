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
const AbstractService_1 = require("./AbstractService");
const mock_1 = require("./test-helpers/mock");
class TestAbstractService extends AbstractService_1.AbstractService {
    handleEtheuremAddressError() {
        return this.createHttpErrorForAddr('0x0000000000000000000000000000000000000000', new Error('Ups! something is wrong.'));
    }
    handlePolkadotAddressError() {
        return this.createHttpErrorForAddr('EQBwtmKWCyRrQ8yGWg7LkB8p7hpEKXZz4qUg9WR8hZmieCM', new Error('Ups! something is wrong.'));
    }
}
const mockApi = {
    ...mock_1.defaultMockApi,
    at: (_hash) => ({}),
};
const testService = new TestAbstractService(mockApi);
describe('AbstractService', () => {
    describe('createHttpErrorForAddr', () => {
        it('should throws an error instanceof EtheuremAddressNotSupported', () => {
            const err = testService.handleEtheuremAddressError();
            expect(err.expose).toBeTruthy();
            expect(err.headers).toBeUndefined();
            expect(err.message).not.toBeUndefined();
            expect(err.name).toEqual(AbstractService_1.EtheuremAddressNotSupported.name);
            expect(err.stack).not.toBeUndefined();
            expect(err.status).toEqual(400);
            expect(err.statusCode).toEqual(400);
            expect(err).toBeInstanceOf(AbstractService_1.EtheuremAddressNotSupported);
        });
        it('should throws an error instanceof BadRequest', () => {
            const err = testService.handlePolkadotAddressError();
            expect(err.expose).toBeTruthy();
            expect(err.headers).toBeUndefined();
            expect(err.message).not.toBeUndefined();
            expect(err.name).toEqual(http_errors_1.BadRequest.name);
            expect(err.stack).not.toBeUndefined();
            expect(err.status).toEqual(400);
            expect(err.statusCode).toEqual(400);
            expect(err).toBeInstanceOf(http_errors_1.BadRequest);
        });
    });
});
//# sourceMappingURL=AbstractService.spec.js.map