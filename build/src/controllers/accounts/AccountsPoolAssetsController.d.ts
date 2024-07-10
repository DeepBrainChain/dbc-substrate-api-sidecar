import { ApiPromise } from '@polkadot/api';
import { AccountsPoolAssetsService } from '../../services/accounts';
import AbstractController from '../AbstractController';
/**
 * Get pool asset information for an address.
 *
 * Paths:
 * - `address`: The address to query
 *
 * Query:
 * - (Optional)`at`: Block at which to retrieve runtime version information at. Block
 *  	identifier, as the block height or block hash. Defaults to most recent block.
 * - (Optional for `/accounts/:address/pool-asset-balances`)`assets`
 * - (Required for `/accounts/:address/pool-asset-approvals)`assetId` The assetId associated
 * 		with the `AssetApproval`.
 * - (Required for `/accounts/:address/pool-asset-approvals)`delegate` The delegate associated
 * 		with the `ApprovalKey` which is tied to a `Approval`. The `ApprovalKey` consists
 * 		of an `owner` which is the `address` path parameter, and a `delegate`.
 *
 * `/accounts/:address/pool-asset-balances`
 * Returns:
 * - `at`: Block number and hash at which the call was made.
 * - `poolAssets`: An array of `AssetBalance` objects which have a AssetId attached to them
 * 		- `assetId`: The identifier of the asset.
 * 		- `balance`: The balance of the asset.
 * 		- `isFrozen`: Whether the pool asset is frozen for non-admin transfers.
 * 		- `isSufficient`: Whether a non-zero balance of this pool asset is a deposit of sufficient
 * 			value to account for the state bloat associated with its balance storage. If set to
 *			`true`, then non-zero balances may be stored without a `consumer` reference (and thus
 * 			an ED in the Balances pallet or whatever else is used to control user-account state
 *			growth).
 *
 * `/accounts/:address/pool-asset-approvals`
 * Returns:
 * - `at`: Block number and hash at which the call was made.
 * - `amount`: The amount of funds approved for the balance transfer from the owner
 * 		to some delegated target.
 * - `deposit`: The amount reserved on the owner's account to hold this item in storage.
 *
 * Substrate Reference:
 * - PoolAssets Pallet: instance of Assets Pallet https://crates.parity.io/pallet_assets/index.html
 * - `AssetBalance`: https://crates.parity.io/pallet_assets/struct.AssetBalance.html
 * - `ApprovalKey`: https://crates.parity.io/pallet_assets/struct.ApprovalKey.html
 * - `Approval`: https://crates.parity.io/pallet_assets/struct.Approval.html
 *
 */
export default class AccountsPoolAssetsController extends AbstractController<AccountsPoolAssetsService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    private getPoolAssetBalances;
    private getPoolAssetApprovals;
}
