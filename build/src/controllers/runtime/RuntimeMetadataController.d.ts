import { ApiPromise } from '@polkadot/api';
import { RuntimeMetadataService } from '../../services';
import AbstractController from '../AbstractController';
/**
 * GET the chain's metadata.
 *
 * Path params:
 * - (Optional) `metadataVersion`: The specific version of the Metadata to query.
 *  The input must conform to the `vX` format, where `X` represents the version number (examples: 'v14', 'v15').
 *
 * Query:
 * - (Optional) `at`: Block hash or height at which to query. If not provided, queries
 *   finalized head.
 *
 * Returns:
 * - Metadata object.
 *
 * Substrate Reference:
 * - FRAME Support: https://crates.parity.io/frame_support/metadata/index.html
 * - Knowledge Base: https://substrate.dev/docs/en/knowledgebase/runtime/metadata
 */
export default class RuntimeMetadataController extends AbstractController<RuntimeMetadataService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    /**
     * Get the chain's latest metadata in a decoded, JSON format.
     *
     * @param _req Express Request
     * @param res Express Response
     */
    private getMetadata;
    /**
     * Get the chain's metadata at a specific version in a decoded, JSON format.
     *
     * @param _req Express Request
     * @param res Express Response
     */
    private getMetadataVersioned;
    /**
     * Get the available versions of chain's metadata.
     *
     * @param _req Express Request
     * @param res Express Response
     */
    private getMetadataAvailableVersions;
}
