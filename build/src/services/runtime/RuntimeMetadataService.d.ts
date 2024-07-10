import { ApiDecoration } from '@polkadot/api/types';
import { Metadata } from '@polkadot/types';
import type { BlockHash } from '@polkadot/types/interfaces';
import { AbstractService } from '../AbstractService';
export declare class RuntimeMetadataService extends AbstractService {
    /**
     * Fetch `Metadata` in decoded JSON form.
     *
     * @param hash `BlockHash` to make call at
     */
    fetchMetadata(hash: BlockHash): Promise<Metadata>;
    /**
     * Fetch the requested version of `Metadata` in decoded JSON form.
     *
     * @param hash `BlockHash` to make call at
     */
    fetchMetadataVersioned(apiAt: ApiDecoration<'promise'>, metadataVersion: number): Promise<Metadata>;
    /**
     * Fetch the available `Metadata` versions.
     *
     * @param hash `BlockHash` to make call at
     */
    fetchMetadataVersions(hash: BlockHash): Promise<string[]>;
}
