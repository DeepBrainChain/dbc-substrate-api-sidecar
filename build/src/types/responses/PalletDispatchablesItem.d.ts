import { FunctionMetadataLatest } from '@polkadot/types/interfaces';
import { IPallet } from '.';
export interface IPalletDispatchableItem extends IPallet {
    dispatchableItem: string;
    metadata: FunctionMetadataLatest | undefined;
}
