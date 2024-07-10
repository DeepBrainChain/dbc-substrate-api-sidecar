import { ApiPromise } from '@polkadot/api';
import { TransactionDryRunService } from '../../services';
import AbstractController from '../AbstractController';
/**
 * Dry run an transaction.
 *
 * Returns:
 * - `at`:
 * 		- `hash`: The block's hash.
 * 		- `height`: The block's height.
 * - `dryRunResult`:
 * 		- `resultType`: Either `DispatchOutcome` if the construction is valid
 * 			or `TransactionValidityError` if the transaction has invalid construction.
 * 		- `result`: If there was an error it will be the cause of the error. If the
 * 			transaction executed correctly it will be `Ok: []`.
 * 		- `validityErrorType`: Only present if the `resultType` is
 * 			`TransactionValidityError`. Either `InvalidTransaction` or `UnknownTransaction`.
 *
 * References:
 * - `UnknownTransaction`: https://crates.parity.io/sp_runtime/transaction_validity/enum.UnknownTransaction.html
 * - `InvalidTransaction`: https://crates.parity.io/sp_runtime/transaction_validity/enum.InvalidTransaction.html
 *
 * Note: If you get the error `-32601: Method not found` it means that the node sidecar
 * is connected to does not expose the `system_dryRun` RPC. One way to resolve this
 * issue is to pass the `--rpc-external` flag to that node.
 */
export default class TransactionDryRunController extends AbstractController<TransactionDryRunService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    private dryRunTransaction;
}
