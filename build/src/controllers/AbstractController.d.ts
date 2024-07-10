import { ApiPromise } from '@polkadot/api';
import { BlockHash } from '@polkadot/types/interfaces';
import { RequestHandler, Response, Router } from 'express';
import { AbstractService } from 'src/services/AbstractService';
import { AnyJson } from 'src/types/polkadot-js';
import { IAddressNumberParams, IAddressParam, IConvertQueryParams, INumberParam, IParaIdParam, IRangeQueryParam } from 'src/types/requests';
import { ISanitizeOptions } from '../types/sanitize';
type SidecarRequestHandler = RequestHandler<unknown, unknown, unknown, IRangeQueryParam> | RequestHandler<IAddressParam, unknown, unknown, IConvertQueryParams> | RequestHandler<IAddressParam> | RequestHandler<IAddressNumberParams> | RequestHandler<INumberParam> | RequestHandler<IParaIdParam> | RequestHandler;
/**
 * Abstract base class for creating controller classes.
 */
export default abstract class AbstractController<T extends AbstractService> {
    protected api: ApiPromise;
    private _path;
    protected service: T;
    private _router;
    constructor(api: ApiPromise, _path: string, service: T);
    get path(): string;
    get router(): Router;
    /**
     * Mount all controller handler methods on the class's private router.
     *
     * Keep in mind that asynchronous errors in the RequestHandlers need to be
     * dealt with manually.
     */
    protected abstract initRoutes(): void;
    /**
     * Safely mount async GET routes by wrapping them with an express
     * handler friendly try / catch block and then mounting on the controllers
     * router.
     *
     * @param pathsAndHandlers array of tuples containing the suffix to the controller
     * base path (use empty string if no suffix) and the get request handler function.
     */
    protected safeMountAsyncGetHandlers(pathsAndHandlers: [string, SidecarRequestHandler][]): void;
    /**
     * Safely mount async POST routes by wrapping them with an express
     * handler friendly try / catch block and then mounting on the controllers
     * router.
     *
     * @param pathsAndHandlers array of tuples containing the suffix to the controller
     * base path (use empty string if no suffix) and the get request handler function.
     */
    protected safeMountAsyncPostHandlers(pathsAndHandlers: [string, SidecarRequestHandler][]): void;
    /**
     * Wrapper for any asynchronous RequestHandler function. Pipes errors
     * to downstream error handling middleware.
     *
     * @param cb ExpressHandler
     */
    protected static catchWrap: (cb: RequestHandler) => RequestHandler;
    /**
     * Create or retrieve the corresponding BlockHash for the given block identifier.
     * This also acts as a validation for string based block identifiers.
     *
     * @param blockId string representing a hash or number block identifier.
     */
    protected getHashForBlock(blockId: string): Promise<BlockHash>;
    protected parseNumberOrThrow(n: string, errorMessage: string): number;
    /**
     * Expected format ie: 0-999
     */
    protected parseRangeOfNumbersOrThrow(n: string, maxRange: number): number[];
    protected parseQueryParamArrayOrThrow(n: string[]): number[];
    protected verifyAndCastOr(name: string, str: unknown, or: number | undefined): number | undefined;
    /**
     * Get a BlockHash based on the `at` query param.
     *
     * @param at should be a block height, hash, or undefined from the `at` query param
     */
    protected getHashFromAt(at: unknown): Promise<BlockHash>;
    /**
     * Sanitize the numbers within the response body and then send the response
     * body using the original Express Response object.
     *
     * @param res Response
     * @param body response body
     */
    static sanitizedSend<T>(res: Response<AnyJson>, body: T, options?: ISanitizeOptions): void;
}
export {};
