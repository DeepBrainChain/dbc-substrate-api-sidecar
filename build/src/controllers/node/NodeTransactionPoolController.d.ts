import { ApiPromise } from '@polkadot/api';
import { NodeTransactionPoolService } from '../../services';
import AbstractController from '../AbstractController';
/**
 * GET pending extrinsics from the Substrate node.
 *
 * Returns:
 * - `pool`: array of
 * 		- `hash`: H256 hash of the extrinsic.
 * 		- `encodedExtrinsic`: Scale encoded extrinsic.
 * 		- `tip`: Tip included into the extrinsic. Available when the `includeFee` query param is set to true.
 * 		- `priority`: Priority of the transaction. Calculated by tip * (max_block_{weight|length} / bounded_{weight|length}).
 * 			Available when the `includeFee` query param is set to true.
 * 		- `partialFee`: PartialFee for a transaction. Available when the `includeFee` query param is set to true.
 */
export default class NodeTransactionPoolController extends AbstractController<NodeTransactionPoolService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    /**
     * GET pending extrinsics from the Substrate node.
     *
     * @param req Express Request, accepts the query param `includeFee`
     * @param res Express Response
     */
    private getNodeTransactionPool;
}
