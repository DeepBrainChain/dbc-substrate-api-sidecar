import { ApiPromise } from '@polkadot/api';
import { BlockHash } from '@polkadot/types/interfaces';
import { IPalletNominationPool, IPalletNominationPoolInfo } from '../../types/responses/';
import { AbstractService } from '../AbstractService';
export declare class PalletsNominationPoolService extends AbstractService {
    constructor(api: ApiPromise);
    /**
     * Fetch nomination pool information at a given block and pool Id.
     *
     * @param poolId `Id` of the pool being queried
     * @param hash `BlockHash` to make call at
     * @param getMetaData boolean determining whether to query pool metadata
     */
    fetchNominationPoolById(poolId: number, hash: BlockHash, getMetaData: boolean): Promise<IPalletNominationPool>;
    /**
     * Fetch generalized nomination pool information at a given block.
     *
     * @param hash `BlockHash` to make call at
     */
    fetchNominationPoolInfo(hash: BlockHash): Promise<IPalletNominationPoolInfo>;
}
