import { ErrorRequestHandler } from 'express';
/**
 * Handle errors of an older format and prior to the introduction of http-error.
 *
 * @param err any
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
export declare const legacyErrorMiddleware: ErrorRequestHandler;
