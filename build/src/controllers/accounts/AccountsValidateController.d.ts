import { ApiPromise } from '@polkadot/api';
import { AccountsValidateService } from '../../services/accounts';
import AbstractController from '../AbstractController';
export default class ValidateAddressController extends AbstractController<AccountsValidateService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    private validateAddress;
}
