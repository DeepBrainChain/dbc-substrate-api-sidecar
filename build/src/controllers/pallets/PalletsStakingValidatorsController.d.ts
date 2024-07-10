import { ApiPromise } from '@polkadot/api';
import { PalletsStakingValidatorsService } from '../../services';
import AbstractController from '../AbstractController';
export default class PalletsStakingValidatorsController extends AbstractController<PalletsStakingValidatorsService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    /**
     * Get the progress of the staking pallet system.
     *
     * @param _req Express Request
     * @param res Express Response
     */
    private getPalletStakingValidators;
}
