import { ErrorRequestHandler } from 'express';
/**
 * Handle errors from transaction POST methods
 *
 * @param exception unknown
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
export declare const txErrorMiddleware: ErrorRequestHandler;
