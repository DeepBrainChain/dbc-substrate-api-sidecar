import { ApiDecoration } from '@polkadot/api/types';
import type { BlockHash } from '@polkadot/types/interfaces';
import { ITransactionMaterial } from 'src/types/responses';
import { MetadataOpts } from '../../controllers/transaction/TransactionMaterialController';
import { AbstractService } from '../AbstractService';
export declare class TransactionMaterialService extends AbstractService {
    /**
     * Fetch all the network information needed to construct a transaction offline.
     *
     * @param hash `BlockHash` to make call at
     */
    fetchTransactionMaterial(hash: BlockHash, metadataArg: MetadataOpts | false): Promise<ITransactionMaterial>;
    /**
     * Fetch all the network information needed to construct a transaction offline.
     *
     * @param hash `BlockHash` to make call at
     */
    fetchTransactionMaterialwithVersionedMetadata(apiAt: ApiDecoration<'promise'>, hash: BlockHash, metadataArg: MetadataOpts | false, metadataVersion: number): Promise<ITransactionMaterial>;
}
