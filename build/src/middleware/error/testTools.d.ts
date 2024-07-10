import { ErrorRequestHandler } from 'express';
/**
 * Assert that a middleware function (`ware`) calls `next` when passed `err`.
 *
 * @param ware the error handling middleware to test
 * @param name name of the error type
 * @param err error
 */
export declare const callsNextWithErr: (ware: ErrorRequestHandler) => (name: string, err: unknown) => void;
/**
 * Assert that a middleware function (`ware`) will catch `err` and set status to
 * `code`.
 *
 * @param ware the error handling middleware to test
 * @param name name of the error type
 * @param err error
 * @param code expected code to be sent as status
 */
export declare const catchesErrWithStatus: (ware: ErrorRequestHandler) => (name: string, err: unknown, code: number) => void;
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
export declare const catchesErrWithResponse: (ware: ErrorRequestHandler) => (name: string, err: unknown, code: number, response: unknown) => void;
export declare function callsNextWithSentHeaders(ware: ErrorRequestHandler, err: unknown): void;
