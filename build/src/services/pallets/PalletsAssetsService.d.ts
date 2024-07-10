import { ApiPromise } from '@polkadot/api';
import { BlockHash } from '@polkadot/types/interfaces';
import { IAssetInfo } from '../../types/responses';
import { AbstractService } from '../AbstractService';
export declare class PalletsAssetsService extends AbstractService {
    constructor(api: ApiPromise);
    /**
     * Fetch an asset's `AssetDetails` and `AssetMetadata` with its `AssetId`.
     *
     * @param hash `BlockHash` to make call at
     * @param assetId `AssetId` used to get info and metadata for an asset
     */
    fetchAssetById(hash: BlockHash, assetId: number): Promise<IAssetInfo>;
}
