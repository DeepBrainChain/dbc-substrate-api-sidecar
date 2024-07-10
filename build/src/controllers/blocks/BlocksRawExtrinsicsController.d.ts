import { ApiPromise } from '@polkadot/api';
import { BlocksService } from '../../services';
import { ControllerOptions } from '../../types/chains-config';
import AbstractController from '../AbstractController';
export default class BlocksRawExtrinsicsController extends AbstractController<BlocksService> {
    constructor(api: ApiPromise, options: ControllerOptions);
    protected initRoutes(): void;
    /**
     *
     * @param _req Express Request
     * @param res Express Response
     */
    private getBlockRawExtrinsics;
}
