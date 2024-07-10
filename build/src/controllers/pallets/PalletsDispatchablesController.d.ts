import { ApiPromise } from '@polkadot/api';
import { PalletsDispatchablesService } from '../../services';
import AbstractController from '../AbstractController';
/**
 * `/pallets/{palletId}/dispatchables`
 *
 * Returns the metadata for each dispatchable item of the pallet.
 *
 * `/pallets/{palletId}/dispatchables/{dispatchableItemId}`
 *
 * Returns the info for the dispatchableItemId.
 *
 * See `docs/src/openapi-v1.yaml` for usage information.
 */
export default class PalletsDispatchablesController extends AbstractController<PalletsDispatchablesService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    /**
     * Note: the `at` parameter is not provided because the call for dispatchables does not exist on the historicApi currently.
     * Support may be added for this in a future update.
     */
    private getDispatchableById;
    /**
     * Note: the `at` parameter is not provided because the call for dispatchables does not exist on the historicApi currently.
     * Support may be added for this in a future update.
     */
    private getDispatchables;
}
