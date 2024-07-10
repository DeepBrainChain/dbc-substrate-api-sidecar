import { ErrorRequestHandler } from 'express';
/**
 * Handle HttpError instances.
 *
 * Should be put before middleware that handles Error, since HttpError
 * inherits from Error.
 *
 * @param exception unknown
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
export declare const httpErrorMiddleware: ErrorRequestHandler;
