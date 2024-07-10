import { BlockHash } from '@polkadot/types/interfaces';
import { IPalletStakingValidator } from '../../types/responses';
import { AbstractService } from '../AbstractService';
export declare class PalletsStakingValidatorsService extends AbstractService {
    /**
     * Fetch all validators addresses and their status at a given block.
     * The status of the validator can be either:
     * - `active` (validator is part of the active set) or
     * - `waiting` (validator did not get into the active set this era)
     *
     * @param hash `BlockHash` to make call at
     */
    derivePalletStakingValidators(hash: BlockHash): Promise<IPalletStakingValidator>;
}
