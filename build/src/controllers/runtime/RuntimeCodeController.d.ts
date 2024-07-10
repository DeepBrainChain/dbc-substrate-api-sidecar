import { ApiPromise } from '@polkadot/api';
import { RuntimeCodeService } from '../../services';
import AbstractController from '../AbstractController';
/**
 * Get the Wasm code blob of the Substrate runtime.
 *
 * Query:
 * - (Optional)`at`: Block at which to retrieve runtime version information at. Block
 * 		identifier, as the block height or block hash. Defaults to most recent block.
 *
 * Returns:
 * - `at`: Block number and hash at which the call was made.
 * - `code`: Runtime code Wasm blob.
 */
export default class RuntimeCodeController extends AbstractController<RuntimeCodeService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    /**
     * Get the chain's latest metadata in a decoded, JSON format.
     *
     * @param _req Express Request
     * @param res Express Response
     */
    private getCodeAtBlock;
}
