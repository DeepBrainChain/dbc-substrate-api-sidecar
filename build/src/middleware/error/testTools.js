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
exports.callsNextWithSentHeaders = exports.catchesErrWithResponse = exports.catchesErrWithStatus = exports.callsNextWithErr = void 0;
/**
 * Empty mock Express Request.
 */
const mockReq = {};
/**
 * Assert that a middleware function (`ware`) calls `next` when passed `err`.
 *
 * @param ware the error handling middleware to test
 * @param name name of the error type
 * @param err error
 */
const callsNextWithErr = (ware) => (name, err) => {
    it(`calls next on error of type ${name}`, () => {
        const next = jest.fn();
        const send = jest.fn();
        const status = jest.fn((_code) => {
            return {
                send,
            };
        });
        ware(err, mockReq, { headersSent: false, status }, next);
        expect(status).not.toBeCalled();
        expect(send).not.toBeCalled();
        expect(next).toBeCalledTimes(1);
    });
};
exports.callsNextWithErr = callsNextWithErr;
/**
 * Assert that a middleware function (`ware`) will catch `err` and set status to
 * `code`.
 *
 * @param ware the error handling middleware to test
 * @param name name of the error type
 * @param err error
 * @param code expected code to be sent as status
 */
const catchesErrWithStatus = (ware) => (name, err, code) => {
    it(`catches ${name} and sends status code ${code}`, () => {
        const next = jest.fn();
        const send = jest.fn();
        const status = jest.fn((_code) => {
            return {
                send,
            };
        });
        ware(err, mockReq, { headersSent: false, status }, next);
        expect(send).toBeCalledTimes(1);
        expect(status).toBeCalledWith(code);
        expect(status).toBeCalledTimes(1);
        expect(next).not.toBeCalled();
    });
};
exports.catchesErrWithStatus = catchesErrWithStatus;
/**
 * Assert that a middleware function (`ware`) will catch `err`, set status to
 * `code`, and send `response`.
 *
 * @param ware the error handling middleware to test
 * @param name name of the error type
 * @param err error
 * @param code expected code to be sent as status
 * @param response expected response body
 */
const catchesErrWithResponse = (ware) => (name, err, code, response) => {
    it(`catches ${name} and sends status code ${code}`, () => {
        const next = jest.fn();
        const send = jest.fn();
        const status = jest.fn((_code) => {
            return {
                send,
            };
        });
        ware(err, mockReq, { headersSent: false, status }, next);
        expect(send).toBeCalledTimes(1);
        expect(send).toBeCalledWith(response);
        expect(status).toBeCalledWith(code);
        expect(status).toBeCalledTimes(1);
        expect(next).not.toBeCalled();
    });
};
exports.catchesErrWithResponse = catchesErrWithResponse;
function callsNextWithSentHeaders(ware, err) {
    it('calls next if the headers have been sent', () => {
        const next = jest.fn();
        const send = jest.fn();
        const status = jest.fn((_code) => {
            return {
                send,
            };
        });
        ware(err, mockReq, { headersSent: true, status }, next);
        expect(send).not.toBeCalled();
        expect(status).not.toBeCalled();
        expect(next).toBeCalledTimes(1);
    });
}
exports.callsNextWithSentHeaders = callsNextWithSentHeaders;
//# sourceMappingURL=testTools.js.map