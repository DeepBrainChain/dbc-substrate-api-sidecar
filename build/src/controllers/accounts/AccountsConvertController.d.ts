import { ApiPromise } from '@polkadot/api';
import { AccountsConvertService } from '../../services/accounts';
import AbstractController from '../AbstractController';
export default class AccountsConvertController extends AbstractController<AccountsConvertService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    private accountConvert;
}
