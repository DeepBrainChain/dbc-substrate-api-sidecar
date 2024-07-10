import { BlockHash } from '@polkadot/types/interfaces';
import { IAccountVestingInfo } from 'src/types/responses';
import { AbstractService } from '../AbstractService';
export declare class AccountsVestingInfoService extends AbstractService {
    /**
     * Fetch vesting information for an account at a given block.
     *
     * @param hash `BlockHash` to make call at
     * @param address address of the account to get the vesting info of
     */
    fetchAccountVestingInfo(hash: BlockHash, address: string): Promise<IAccountVestingInfo>;
}
