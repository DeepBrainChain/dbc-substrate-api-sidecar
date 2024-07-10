import { RequestHandler } from 'express';
/**
 * Validate that the given query params that are expected to be booleans are correct.
 *
 * @param queryParams An array of queryParams to check for. These are passed in at the controller level.
 */
export declare const validateBooleanMiddleware: (queryParams: string[]) => RequestHandler;
