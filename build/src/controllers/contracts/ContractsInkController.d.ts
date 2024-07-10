import { ApiPromise } from '@polkadot/api';
import { ContractsInkService } from '../../services';
import AbstractController from '../AbstractController';
export default class ContractsInkController extends AbstractController<ContractsInkService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    /**
     * Send a message call to a contract. It defaults to get if nothing is inputted.
     *
     * @param _req
     * @param res
     */
    private callContractQuery;
}
