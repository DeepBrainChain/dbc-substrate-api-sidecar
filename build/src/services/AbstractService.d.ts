import { ApiPromise } from '@polkadot/api';
import { Text, Vec } from '@polkadot/types';
import { HttpError } from 'http-errors';
export declare class EtheuremAddressNotSupported extends Error implements HttpError {
    readonly status: number;
    readonly statusCode: number;
    readonly expose: boolean;
    readonly name: string;
    constructor(msg: string);
}
export declare abstract class AbstractService {
    protected api: ApiPromise;
    constructor(api: ApiPromise);
    /**
     * Process metadata documention.
     *
     * @param docs metadata doucumentation array
     */
    protected sanitizeDocs(docs: Vec<Text>): string;
    /**
     * Returns HttpError with the correct err message for querying accounts balances.
     *
     * @function
     * @param {string} address Address that was queried
     * @param {Error} err Error returned from the promise
     * @returns {HttpError}
     */
    protected createHttpErrorForAddr(address: string, err: Error): HttpError;
}
