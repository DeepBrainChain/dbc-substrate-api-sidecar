import { Request } from 'express';
import { RequestHandler } from 'express-serve-static-core';
/**
 * Assert that a middleware does not error with the given request.
 *
 * @param name String for tests to log.
 * @param req Express Request containing thing it errors on.
 */
export declare const doesNotErrorWith: (name: string, req: Request, middleware: RequestHandler) => void;
/**
 * Assert that a middleware passes `err` to next with the given
 * `req`.
 *
 * @param name String for tests to log.
 * @param req Express Request containing thing it errors on.
 * @param err Expected error that it passes to next.
 */
export declare const errorsWith: (name: string, req: Request, err: unknown, middleware: RequestHandler) => void;
