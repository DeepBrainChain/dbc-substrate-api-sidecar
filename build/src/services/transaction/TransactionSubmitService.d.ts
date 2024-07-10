import { Hash } from '@polkadot/types/interfaces';
import { AbstractService } from '../AbstractService';
export declare class TransactionSubmitService extends AbstractService {
    /**
     * Submit a fully formed SCALE-encoded extrinsic for block inclusion.
     *
     * @param extrinsic scale encoded extrinsic to submit
     */
    submitTransaction(transaction: string): Promise<{
        hash: Hash;
    }>;
}
