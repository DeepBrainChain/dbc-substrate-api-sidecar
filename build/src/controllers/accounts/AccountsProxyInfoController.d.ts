import { ApiPromise } from '@polkadot/api';
import { AccountsProxyInfoService } from '../../services';
import AbstractController from '../AbstractController';
export default class AccountsProxyInfoController extends AbstractController<AccountsProxyInfoService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    /**
     * Get the latest account balance summary of `address`.
     *
     * @param req Express Request
     * @param res Express Response
     */
    private getAccountProxyInfo;
}
