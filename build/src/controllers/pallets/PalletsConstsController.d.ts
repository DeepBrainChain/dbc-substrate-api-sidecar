import { ApiPromise } from '@polkadot/api';
import { PalletsConstantsService } from '../../services';
import AbstractController from '../AbstractController';
/**
 * `/pallets/{palletId}/consts`
 *
 * Returns the metadata for each constant item of the pallet.
 *
 * `/pallets/{palletId}/consts/{constantItemId}`
 *
 * Returns the info for the constantItemId.
 *
 * See `docs/src/openapi-v1.yaml` for usage information.
 */
export default class PalletsConstantsController extends AbstractController<PalletsConstantsService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    private getConstById;
    private getConsts;
}
