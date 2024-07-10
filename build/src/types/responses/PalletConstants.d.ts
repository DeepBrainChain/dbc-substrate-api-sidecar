import { Text } from '@polkadot/types';
import { PalletConstantMetadataLatest } from '@polkadot/types/interfaces';
import { IAt } from '.';
import { IPallet } from './Pallet';
export interface IPalletConstants extends IPallet {
    at: IAt;
    pallet: string;
    palletIndex: number;
    items: PalletConstantMetadataLatest[] | Text[];
}
