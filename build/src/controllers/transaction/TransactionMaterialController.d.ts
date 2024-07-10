import { ApiPromise } from '@polkadot/api';
import { TransactionMaterialService } from '../../services';
import AbstractController from '../AbstractController';
export type MetadataOpts = 'json' | 'scale';
/**
 * GET all the network information needed to construct a transaction offline.
 *
 * Path params:
 * - (Optional) `metadataVersion`: The specific version of the Metadata to query.
 *  The input must conform to the `vX` format, where `X` represents the version number (examples: 'v14', 'v15').
 *
 * Query
 * - (Optional) `metadata`: It accepts `json`, or `scale` values. If it is not present,
 *   the metadata field will not be included.
 * - (Optional) `at`: Block hash or number at which to query. If not provided, queries
 *   finalized head.
 *
 * Returns:
 * - `at`: Block number and hash at which the call was made.
 * - `genesisHash`: The hash of the chain's genesis block.
 * - `chainName`: The chain's name.
 * - `specName`: The chain's spec.
 * - `specVersion`: The spec version. Always increased in a runtime upgrade.
 * - `txversion`: The transaction version. Common `txVersion` numbers indicate that the
 *   transaction encoding format and method indices are the same. Needed for decoding in an
 *   offline environment. Adding new transactions does not change `txVersion`.
 * - `metadata`: The chain's metadata in hex format.
 *
 * Note: `chainName`, `specName`, and `specVersion` are used to define a type registry with a set
 * of signed extensions and types. For Polkadot and Kusama, `chainName` is not used in defining
 * this registry, but in other Substrate-based chains that re-launch their network without
 * changing the `specName`, the `chainName` would be needed to create the correct registry.
 *
 * Substrate Reference:
 * - `RuntimeVersion`: https://crates.parity.io/sp_version/struct.RuntimeVersion.html
 * - `SignedExtension`: https://crates.parity.io/sp_runtime/traits/trait.SignedExtension.html
 * -  FRAME Support: https://crates.parity.io/frame_support/metadata/index.html
 */
export default class TransactionMaterialController extends AbstractController<TransactionMaterialService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    /**
     * GET all the network information needed to construct a transaction offline.
     *
     * @param _req Express Request
     * @param res Express Response
     */
    private getTransactionMaterial;
    /**
     * The metadata args have two options. `json`, and `scale`.
     *
     * @param metadata
     */
    private parseMetadataArgs;
    /**
     * Get the chain's metadata at the requested version in JSON or scale format
     * depending on the `metadata` query param.
     *
     * @param _req Express Request
     * @param res Express Response
     */
    private getTransactionMaterialwithVersionedMetadata;
}
