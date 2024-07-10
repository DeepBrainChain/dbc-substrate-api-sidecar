import { ApiPromise } from '@polkadot/api';
import { BlocksTraceService } from '../../services';
import AbstractController from '../AbstractController';
export default class BlocksTraceController extends AbstractController<BlocksTraceService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    private getLatestBlockTraces;
    private getBlockTraces;
    private getLatestBlockOperations;
    private getBlockOperations;
}
