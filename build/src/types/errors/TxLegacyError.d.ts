import { IBasicLegacyError } from './BasicLegacyError';
/**
 * Error from tx POST methods
 */
export interface ITxLegacyError extends IBasicLegacyError {
    code: number;
    data?: string;
    transaction?: string;
    cause: unknown;
    stack: string;
    at?: string;
}
/**
 * Type guard to check if something is a subset of the interface TxError.
 *
 * @param thing to check type of
 */
export declare function isTxLegacyError(thing: unknown): thing is ITxLegacyError;
