import { ApiPromise } from '@polkadot/api';
import { BlockHash } from '@polkadot/types/interfaces';
import { IForeignAssets } from '../../types/responses';
import { AbstractService } from '../AbstractService';
export declare class PalletsForeignAssetsService extends AbstractService {
    constructor(api: ApiPromise);
    /**
     * Fetch all foreign asset's `AssetDetails` and `AssetMetadata`.
     *
     * @param hash `BlockHash` to make call at
     */
    fetchForeignAssets(hash: BlockHash): Promise<IForeignAssets>;
}
