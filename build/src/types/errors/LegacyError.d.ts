import { IBasicLegacyError } from './BasicLegacyError';
/**
 * Format of some older error messages.
 */
export interface ILegacyError extends IBasicLegacyError {
    statusCode: number;
}
/**
 * Type guard to check if something is a subset of the interface LegacyError.
 *
 * @param thing to check type of
 */
export declare function isLegacyError(thing: unknown): thing is ILegacyError;
