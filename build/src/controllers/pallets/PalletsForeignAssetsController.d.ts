import { ApiPromise } from '@polkadot/api';
import { PalletsForeignAssetsService } from '../../services';
import AbstractController from '../AbstractController';
/**
 * GET asset information for all foreign assets.
 *
 * Query:
 * - (Optional)`at`: Block at which to retrieve runtime version information at. Block
 *  	identifier, as the block height or block hash. Defaults to most recent block.
 *
 * `/pallets/foreign-assets`
 * Returns:
 * - `at`: Block number and hash at which the call was made.
 * - `items`: An array containing the `AssetDetails` and `AssetMetadata` of every foreign asset.
 *
 * Substrate References:
 * - Foreign Assets Pallet Instance in Kusama Asset Hub: https://github.com/paritytech/cumulus/blob/master/parachains/runtimes/assets/asset-hub-kusama/src/lib.rs#L295
 */
export default class PalletsForeignAssetsController extends AbstractController<PalletsForeignAssetsService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    private getForeignAssets;
}
