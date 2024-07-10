import { BlockHash } from '@polkadot/types/interfaces';
import { IPalletStakingProgress } from 'src/types/responses';
import { AbstractService } from '../AbstractService';
export declare class PalletsStakingProgressService extends AbstractService {
    /**
     * Fetch and derive generalized staking information at a given block.
     *
     * @param hash `BlockHash` to make call at
     */
    derivePalletStakingProgress(hash: BlockHash): Promise<IPalletStakingProgress>;
    /**
     * Derive information on the progress of the current session and era.
     *
     * @param api ApiPromise with ensured metadata
     * @param hash `BlockHash` to make call at
     */
    private deriveSessionAndEraProgress;
    /**
     * Get electionLookAhead as a const if available. Otherwise derive
     * `electionLookAhead` based on the `specName` & `epochDuration`.
     * N.B. Values are hardcoded based on `specName`s polkadot, kusama, and westend.
     * There are no guarantees that this will return the expected values for
     * other `specName`s.
     *
     * @param api ApiPromise with ensured metadata
     * @param hash `BlockHash` to make call at
     */
    private deriveElectionLookAhead;
}
