import { PalletCallMetadataLatest } from '@polkadot/types/interfaces';
import { IPallet } from '.';
export interface IPalletConstantsItem extends IPallet {
    constantsItem: string;
    metadata: PalletCallMetadataLatest | undefined;
}
