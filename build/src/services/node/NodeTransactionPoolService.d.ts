import { INodeTransactionPool } from '../../types/responses';
import { AbstractService } from '../AbstractService';
export declare class NodeTransactionPoolService extends AbstractService {
    /**
     * Fetch the transaction pool, and provide relevant extrinsic information.
     *
     * @param includeFee Whether or not to include the fee's and priority of a extrinsic
     * in the transaction pool.
     */
    fetchTransactionPool(includeFee: boolean): Promise<INodeTransactionPool>;
    /**
     * Extract all information related to the extrinsic, and compute it's
     * priority in the transaction pool.
     *
     * @param ext Extrinsic we want to provide all the information for.
     */
    private extractExtrinsicInfo;
    /**
     * We calculate the priority of an extrinsic in the transaction pool depending
     * on its dispatch class, ie. 'normal', 'operational', 'mandatory'.
     *
     * The following formula can summarize the below logic.
     * tip * (max_block_{weight|length} / bounded_{weight|length})
     *
     * Please reference this link for more information
     * ref: https://github.com/paritytech/substrate/blob/fe5bf49290d166b9552f65e751d46ec592173ebd/frame/transaction-payment/src/lib.rs#L610
     *
     * @param ext
     * @param c
     * @param weight
     */
    private computeExtPriority;
    /**
     * Explicitly define the type of class an extrinsic is.
     *
     * @param c DispatchClass of an extrinsic
     */
    private defineDispatchClassType;
    /**
     * Multiply a value (tip) by its maxTxPerBlock multiplier.
     * ref: https://github.com/paritytech/substrate/blob/fe5bf49290d166b9552f65e751d46ec592173ebd/frame/transaction-payment/src/lib.rs#L633
     *
     * @param val Value to be multiplied by the maxTxPerBlock. Usually a tip.
     * @param maxTxPerBlock The minimum value between maxTxPerBlockWeight and maxTxPerBlockLength
     */
    private maxReward;
}
