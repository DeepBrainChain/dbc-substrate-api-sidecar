import { ApiPromise } from '@polkadot/api';
import { RequestHandler } from 'express';
import { NodeVersionService } from '../../services';
import AbstractController from '../AbstractController';
/**
 * GET information about the Substrates node's implementation and versioning.
 *
 * Returns:
 * - `clientVersion`: Node binary version.
 * - `clientImplName`: Node's implementation name.
 * - `chain`: Node's chain name.
 */
export default class NodeVersionController extends AbstractController<NodeVersionService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    /**
     * GET information about the Substrates node's implementation and versioning.
     *
     * @param _req Express Request
     * @param res Express Response
     */
    getNodeVersion: RequestHandler;
}
