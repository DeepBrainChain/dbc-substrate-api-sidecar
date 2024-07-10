import { BlockHash, RuntimeDispatchInfo, RuntimeDispatchInfoV1 } from '@polkadot/types/interfaces';
import { AbstractService } from '../AbstractService';
export declare class TransactionFeeEstimateService extends AbstractService {
    /**
     * Fetch estimated fee information for a SCALE-encoded extrinsic at a given
     * block.
     *
     * @param hash `BlockHash` to make call at
     * @param extrinsic scale encoded extrinsic to get a fee estimate for
     */
    fetchTransactionFeeEstimate(hash: BlockHash, transaction: string): Promise<RuntimeDispatchInfo | RuntimeDispatchInfoV1>;
}
