import { ApiPromise } from '@polkadot/api';
import { PalletsAssetConversionService } from '../../services';
import AbstractController from '../AbstractController';
export default class PalletsAssetConversionController extends AbstractController<PalletsAssetConversionService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    private getNextAvailableId;
    private getLiquidityPools;
}
