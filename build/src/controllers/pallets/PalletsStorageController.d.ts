import { ApiPromise } from '@polkadot/api';
import { PalletsStorageService } from '../../services';
import AbstractController from '../AbstractController';
/**
 * `/pallets/{palletId}/storage`
 *
 * Returns the metadata for each storage item of the pallet.
 *
 * `/pallets/{palletId}/storage/{storageItemId}`
 *
 * Returns the value stored under the storageItemId. If it is a
 * map, query param key1 is required. If the storage item is double map
 * query params key1 and key2 are required.
 *
 * See `docs/src/openapi-v1.yaml` for usage information.
 */
export default class PalletsStorageController extends AbstractController<PalletsStorageService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    private getStorageItem;
    private getStorage;
}
