import '@polkadot/api-augment';
import { ApiPromise } from '@polkadot/api';
import { BlockHash } from '@polkadot/types/interfaces';
import { ILiquidityId, ILiquidityPools } from '../../types/responses';
import { AbstractService } from '../AbstractService';
export declare class PalletsAssetConversionService extends AbstractService {
    constructor(api: ApiPromise);
    fetchNextAvailableId(hash: BlockHash): Promise<ILiquidityId>;
    fetchLiquidityPools(hash: BlockHash): Promise<ILiquidityPools>;
}
