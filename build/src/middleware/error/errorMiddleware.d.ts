import { ErrorRequestHandler } from 'express';
/**
 * Handle Error instances.
 *
 * @param err unknown
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
export declare const errorMiddleware: ErrorRequestHandler;
