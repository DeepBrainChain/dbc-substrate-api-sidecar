import { ApiDecoration } from '@polkadot/api/types';
import { BlockHash } from '@polkadot/types/interfaces';
import { IPalletStorage, IPalletStorageItem } from 'src/types/responses';
import { AbstractPalletsService } from '../AbstractPalletsService';
interface IFetchPalletArgs {
    hash: BlockHash;
    palletId: string;
}
interface IFetchStorageItemArgs extends IFetchPalletArgs {
    storageItemId: string;
    keys: string[];
    metadata: boolean;
}
export declare class PalletsStorageService extends AbstractPalletsService {
    fetchStorageItem(historicApi: ApiDecoration<'promise'>, { hash, palletId, storageItemId, keys, metadata }: IFetchStorageItemArgs): Promise<IPalletStorageItem>;
    fetchStorage(historicApi: ApiDecoration<'promise'>, { hash, palletId, onlyIds }: IFetchPalletArgs & {
        onlyIds: boolean;
    }): Promise<IPalletStorage>;
    /**
     * Normalize storage item metadata by running it through `sanitizeNumbers` and
     * converting the docs section from an array of strings to a single string
     * joined with new line characters.
     *
     * @param storageItemMeta polkadot-js StorageEntryMetadataV14
     */
    private normalizeStorageItemMeta;
}
export {};
