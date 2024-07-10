import { Text } from '@polkadot/types';
import { ErrorMetadataLatest } from '@polkadot/types/interfaces';
import { IAt } from '.';
import { IPallet } from './Pallet';
export interface IPalletErrors extends IPallet {
    at: IAt;
    pallet: string;
    palletIndex: number;
    items: ErrorMetadataLatest[] | Text[];
}
