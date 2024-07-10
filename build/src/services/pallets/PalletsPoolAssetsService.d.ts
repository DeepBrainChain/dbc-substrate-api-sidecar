import { ApiPromise } from '@polkadot/api';
import { BlockHash } from '@polkadot/types/interfaces';
import { IPoolAssetInfo } from '../../types/responses';
import { AbstractService } from '../AbstractService';
export declare class PalletsPoolAssetsService extends AbstractService {
    constructor(api: ApiPromise);
    /**
     * Fetch a pool asset's `AssetDetails` and `AssetMetadata` with its `AssetId`.
     *
     * @param hash `BlockHash` to make call at
     * @param assetId `AssetId` used to get info and metadata for an asset
     */
    fetchPoolAssetById(hash: BlockHash, assetId: number): Promise<IPoolAssetInfo>;
}
