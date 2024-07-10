import { ApiPromise } from '@polkadot/api';
import { PalletsErrorsService } from '../../services';
import AbstractController from '../AbstractController';
/**
 * `/pallets/{palletId}/errors`
 *
 * Returns the metadata for each error item of the pallet.
 *
 * `/pallets/{palletId}/errors/{errorItemId}`
 *
 * Returns the info for the errorItemId.
 *
 * See `docs/src/openapi-v1.yaml` for usage information.
 */
export default class PalletsErrorsController extends AbstractController<PalletsErrorsService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    private getErrorById;
    private getErrors;
}
