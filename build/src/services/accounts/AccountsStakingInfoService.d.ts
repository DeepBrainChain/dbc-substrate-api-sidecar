import { BlockHash } from '@polkadot/types/interfaces';
import { IAccountStakingInfo } from 'src/types/responses';
import { AbstractService } from '../AbstractService';
export declare class AccountsStakingInfoService extends AbstractService {
    /**
     * Fetch staking information for a _Stash_ account at a given block.
     *
     * @param hash `BlockHash` to make call at
     * @param stash address of the _Stash_  account to get the staking info of
     */
    fetchAccountStakingInfo(hash: BlockHash, stash: string): Promise<IAccountStakingInfo>;
}
