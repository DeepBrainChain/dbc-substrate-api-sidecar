import { BlockHash } from '@polkadot/types/interfaces';
import { ITransactionDryRun } from '../../types/responses';
import { AbstractService } from '../AbstractService';
export declare class TransactionDryRunService extends AbstractService {
    dryRuntExtrinsic(hash: BlockHash, transaction: string): Promise<ITransactionDryRun>;
}
