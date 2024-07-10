import { ApiPromise } from '@polkadot/api';
import { PalletsNominationPoolService } from '../../services';
import AbstractController from '../AbstractController';
export default class PalletsNominationPoolController extends AbstractController<PalletsNominationPoolService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    private getNominationPoolById;
    private getNominationPoolInfo;
}
