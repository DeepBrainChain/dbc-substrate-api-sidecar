import type { ApiPromise } from '@polkadot/api';
import { BlocksService } from '../../services';
import type { ControllerOptions } from '../../types/chains-config';
import AbstractController from '../AbstractController';
export default class BlocksExtrinsicsController extends AbstractController<BlocksService> {
    constructor(api: ApiPromise, options: ControllerOptions);
    protected initRoutes(): void;
    /**
     *
     * @param _req Express Request
     * @param res Express Response
     */
    private getExtrinsicByTimepoint;
}
