import { ApiDecoration } from '@polkadot/api/types';
import { AssetId, BlockHash } from '@polkadot/types/interfaces';
import { IAccountPoolAssetApproval, IAccountPoolAssetsBalances, IPoolAssetBalance } from '../../types/responses';
import { AbstractService } from '../AbstractService';
export declare class AccountsPoolAssetsService extends AbstractService {
    /**
     * Fetch all the `PoolAssetBalance`s alongside their `AssetId`'s for a given array of queried `AssetId`'s.
     * If none are queried the function will get all `AssetId`'s associated with the
     * given `AccountId`, and send back all the `PoolAssetsBalance`s.
     *
     * @param hash `BlockHash` to make call at
     * @param address `AccountId` associated with the balances
     * @param assets An array of `assetId`'s to be queried. If the length is zero
     * all assetId's associated to the account will be queried
     */
    fetchPoolAssetBalances(hash: BlockHash, address: string, assets: number[]): Promise<IAccountPoolAssetsBalances>;
    /**
     * Fetch all `AccountApproval`'s with a given `AssetId` and a `AssetApprovalKey`
     * which consists of a `delegate` and an `owner`
     *
     * @param hash `BlockHash` to make call at
     * @param address `AccountId` or owner associated with the approvals
     * @param assetId `AssetId` associated with the `AssetApproval`
     * @param delegate `delegate`
     */
    fetchPoolAssetApprovals(hash: BlockHash, address: string, assetId: number, delegate: string): Promise<IAccountPoolAssetApproval>;
    /**
     * Takes in an array of `AssetId`s, and an `AccountId` and returns
     * all balances tied to those `AssetId`s.
     *
     * @param api ApiPromise
     * @param assets An Array of `AssetId`s or numbers representing `assetId`s
     * @param address An `AccountId` associated with the queried path
     */
    queryPoolAssets(historicApi: ApiDecoration<'promise'>, assets: AssetId[] | number[], address: string): Promise<IPoolAssetBalance[]>;
    /**
     * @param keys Extract `assetId`s from an array of storage keys
     */
    private extractPoolAssetIds;
    /**
     * Checks if the historicApi has the pool assets pallet. If not
     * it will throw a BadRequest error.
     *
     * @param historicApi Decorated historic api
     */
    private checkPoolAssetsError;
}