import { ErrorRequestHandler } from 'express';
/**
 * The last backstop for errors that do not conform to one of Sidecars error
 * format. Used to create a standardized 500 error instead of relying on express.
 *
 * @param exception any
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
export declare const internalErrorMiddleware: ErrorRequestHandler;
