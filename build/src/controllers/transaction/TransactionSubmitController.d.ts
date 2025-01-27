import { ApiPromise } from '@polkadot/api';
import { TransactionSubmitService } from '../../services';
import AbstractController from '../AbstractController';
/**
 * POST a serialized transaction to submit to the transaction queue.
 *
 * Post info:
 * - `data`: Expects a hex-encoded transaction, e.g. '{"tx": "0x..."}'.
 * - `headers`: Expects 'Content-Type: application/json'.
 *
 * Returns:
 * - Success:
 *   - `hash`: The hash of the encoded transaction.
 * - Failure:
 *   - `error`: 'Failed to parse transaction' or 'Failed to submit transaction'. In the case of the former,
 *     Sidecar was unable to parse the transaction and never submitted it to the client. In
 *     the case of the latter, the transaction queue rejected the transaction.
 *   - `extrinsic`: The hex-encoded extrinsic. Only present if Sidecar fails to parse a transaction.
 *   - `cause`: The error message from parsing or from the client.
 */
export default class TransactionSubmitController extends AbstractController<TransactionSubmitService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    /**
     * Submit a serialized transaction to the transaction queue.
     *
     * @param req Sidecar TxRequest
     * @param res Express Response
     */
    private txSubmit;
}
