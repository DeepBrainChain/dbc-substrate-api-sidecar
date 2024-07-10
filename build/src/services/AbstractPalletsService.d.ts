import { ApiDecoration } from '@polkadot/api/types';
import { ErrorMetadataLatest, EventMetadataLatest, FunctionMetadataLatest, MetadataV14, MetadataV15, PalletConstantMetadataLatest, PalletMetadataV14, PalletMetadataV15, StorageEntryMetadataV14 } from '@polkadot/types/interfaces';
import { AbstractService } from './AbstractService';
type IPalletFieldMeta = ErrorMetadataLatest | EventMetadataLatest | FunctionMetadataLatest | PalletConstantMetadataLatest | StorageEntryMetadataV14;
type IMetadataFieldType = 'calls' | 'constants' | 'events' | 'storage' | 'errors';
export declare abstract class AbstractPalletsService extends AbstractService {
    private getPalletMetadataType;
    private getProperty;
    /**
     * Find a pallet's metadata info.
     *
     * @param palletId identifier for a FRAME pallet as a pallet name or index.
     */
    protected findPalletMeta(adjustedMetadata: MetadataV14 | MetadataV15, palletId: string, metadataFieldType: IMetadataFieldType): [PalletMetadataV14 | PalletMetadataV15, number];
    private validPalletId;
    /**
     * Identify if a pallet Identifier should be an index or a string. If it should
     * be an index return a number and if it should be a name return a string.
     *
     * @param palletId FRAME pallet identifier as a pallet name or index
     */
    private static palletIdxOrName;
    /**
     * Find the an item's metadata within a given pallets' metadata based on a provided type.
     *
     * @param historicApi Decorated historic api
     * @param palletMeta the metadata of the pallet that contains the error item
     * @param palletItemId name of the error item in camel or pascal case
     * @param metadataFieldType name of the metadata field to be queried
     *
     */
    protected findPalletFieldItemMeta(historicApi: ApiDecoration<'promise'>, palletMeta: PalletMetadataV14 | PalletMetadataV15, palletItemId: string, metadataFieldType: IMetadataFieldType): IPalletFieldMeta;
    private getDispatchablesItemMeta;
    private getConstItemMeta;
    private getErrorItemMeta;
    private getEventItemMeta;
    private getStorageItemMeta;
}
export {};
