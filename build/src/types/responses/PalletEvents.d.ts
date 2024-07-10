import { Text } from '@polkadot/types';
import { EventMetadataLatest } from '@polkadot/types/interfaces';
import { IAt } from '.';
import { IPallet } from './Pallet';
export interface IPalletEvents extends IPallet {
    at: IAt;
    pallet: string;
    palletIndex: number;
    items: EventMetadataLatest[] | Text[];
}
