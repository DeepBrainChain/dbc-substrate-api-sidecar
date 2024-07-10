import type { ApiPromise } from '@polkadot/api';
import { BlocksService } from '../../services';
import { ControllerOptions } from '../../types/chains-config';
import AbstractController from '../AbstractController';
/**
 * GET a block.
 *
 * Paths:
 * - `head`: Get the latest finalized block.
 * - (Optional) `number`: Block hash or height at which to query. If not provided, queries
 *   finalized head.
 *
 * Query:
 * - (Optional) `eventDocs`: When set to `true`, every event will have an extra
 * 	`docs` property with a string of the events documentation.
 * - (Optional) `extrinsicDocs`: When set to `true`, every extrinsic will have an extra
 * 	`docs` property with a string of the extrinsics documentation.
 * - (Optional for `/blocks/head`) `finalized`: When set to `false`, it will fetch the head of
 * 	the node's canon chain, which might not be finalized. When set to `true` it
 * 	will fetch the head of the finalized chain.
 * - (Optional) `noFees`: When set to `true`, it will not calculate the fee for each extrinsic.
 * - (Optional for `/blocks/{blockId}`) `decodedXcmMsgs`: When set to `true`, it will show the
 *  decoded XCM messages within the extrinsics of the requested block.
 * - (Optional for `/blocks/{blockId}) `paraId`: When it is set, it will return only the decoded
 *  XCM messages for the specified paraId/parachain Id. To activate this functionality, ensure
 *  that the `decodedXcmMsgs` parameter is set to true.
 *
 *
 * Returns:
 * - `number`: Block height.
 * - `hash`: The block's hash.
 * - `parentHash`: The hash of the parent block.
 * - `stateRoot`: The state root after executing this block.
 * - `extrinsicsRoot`: The Merkle root of the extrinsics.
 * - `authorId`: The account ID of the block author (may be undefined for some chains).
 * - `logs`: Array of `DigestItem`s associated with the block.
 * - `onInitialize`: Object with an array of `SanitizedEvent`s that occurred during block
 *   initialization with the `method` and `data` for each.
 * - `extrinsics`: Array of extrinsics (inherents and transactions) within the block. Each
 *   contains:
 *   - `method`: Extrinsic method.
 *   - `signature`: Object with `signature` and `signer`, or `null` if unsigned.
 *   - `nonce`: Account nonce, if applicable.
 *   - `args`: Array of arguments. Note: if you are expecting an [`OpaqueCall`](https://substrate.dev/rustdocs/v2.0.0/pallet_multisig/type.OpaqueCall.html)
 * 			and it is not decoded in the response (i.e. it is just a hex string), then Sidecar was not
 * 			able to decode it and likely that it is not a valid call for the runtime.
 *   - `tip`: Any tip added to the transaction.
 *   - `hash`: The transaction's hash.
 *   - `info`: `RuntimeDispatchInfo` for the transaction. Includes the `partialFee`.
 *   - `events`: An array of `SanitizedEvent`s that occurred during extrinsic execution.
 *   - `success`: Whether or not the extrinsic succeeded.
 *   - `paysFee`: Whether the extrinsic requires a fee. Careful! This field relates to whether or
 *     not the extrinsic requires a fee if called as a transaction. Block authors could insert
 *     the extrinsic as an inherent in the block and not pay a fee. Always check that `paysFee`
 *     is `true` and that the extrinsic is signed when reconciling old blocks.
 * - `onFinalize`: Object with an array of `SanitizedEvent`s that occurred during block
 *   finalization with the `method` and `data` for each.
 * - `decodedXcmMsgs`: An array of the decoded XCM messages found within the extrinsics
 *   of the requested block.
 *
 * Note: Block finalization does not correspond to consensus, i.e. whether the block is in the
 * canonical chain. It denotes the finalization of block _construction._
 *
 * Substrate Reference:
 * - `DigestItem`: https://crates.parity.io/sp_runtime/enum.DigestItem.html
 * - `RawEvent`: https://crates.parity.io/frame_system/enum.RawEvent.html
 * - Extrinsics: https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics
 * - `Extrinsic`: https://crates.parity.io/sp_runtime/traits/trait.Extrinsic.html
 * - `OnInitialize`: https://crates.parity.io/frame_support/traits/trait.OnInitialize.html
 * - `OnFinalize`: https://crates.parity.io/frame_support/traits/trait.OnFinalize.html
 */
export default class BlocksController extends AbstractController<BlocksService> {
    private readonly options;
    constructor(api: ApiPromise, options: ControllerOptions);
    protected initRoutes(): void;
    /**
     * Get the latest block.
     *
     * @param _req Express Request
     * @param res Express Response
     */
    private getLatestBlock;
    /**
     * Get a block by its hash or number identifier.
     *
     * @param req Express Request
     * @param res Express Response
     */
    private getBlockById;
    /**
     * Return the Header of the identified block.
     *
     * @param req Express Request
     * @param res Express Response
     */
    private getBlockHeaderById;
    /**
     * Return the header of the latest block
     *
     * @param req Express Request
     * @param res Express Response
     */
    private getLatestBlockHeader;
    /**
     * Return a collection of blocks, given a range.
     *
     * @param req Express Request
     * @param res Express Response
     */
    private getBlocks;
}
