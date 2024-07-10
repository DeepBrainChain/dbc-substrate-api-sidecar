import { BlockHash } from '@polkadot/types/interfaces';
import { IMetadataCode } from 'src/types/responses';
import { AbstractService } from '../AbstractService';
export declare const CODE_KEY = "0x3a636f6465";
export declare class RuntimeCodeService extends AbstractService {
    /**
     * Fetch `Metadata` in decoded JSON form.
     *
     * @param hash `BlockHash` to make call at
     */
    fetchCode(hash: BlockHash): Promise<IMetadataCode>;
}
