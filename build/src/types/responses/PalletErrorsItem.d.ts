import { ErrorMetadataLatest } from '@polkadot/types/interfaces';
import { IPallet, ISanitizedErrorItemMetadata } from '.';
export interface IPalletErrorsItem extends IPallet {
    errorItem: string;
    metadata: ISanitizedErrorItemMetadata | ErrorMetadataLatest | undefined;
}
