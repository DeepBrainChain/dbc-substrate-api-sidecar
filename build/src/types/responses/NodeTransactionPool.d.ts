import { Balance } from '@polkadot/types/interfaces';
interface IPoolExtrinsic {
    /**
     * H256 hash of the extrinsic
     */
    hash: string;
    /**
     * SCALE encoded extrinsic
     */
    encodedExtrinsic: string;
    /**
     * The tip within an extrinsic. Available when the `tip` query parameter
     * for `/node/transaction-pool` is set to true.
     */
    tip?: string;
    /**
     * PartialFee for a transaction
     */
    partialFee?: Balance;
    /**
     * Priority of the transaction. Calculated by tip * (max_block_{weight|length} / bounded_{weight|length})
     */
    priority?: string;
}
export interface INodeTransactionPool {
    pool: IPoolExtrinsic[];
}
export {};
