import { Codec } from '../polkadot-js';
import { IPallet, ISanitizedStorageItemMetadata } from '.';
export interface IPalletStorageItem extends IPallet {
    storageItem: string;
    keys: string[];
    value: Codec;
    metadata: ISanitizedStorageItemMetadata | undefined;
}
