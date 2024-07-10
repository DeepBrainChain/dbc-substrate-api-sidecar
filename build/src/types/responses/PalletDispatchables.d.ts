import { Text } from '@polkadot/types';
import { FunctionMetadataLatest } from '@polkadot/types/interfaces';
import { IAt } from '.';
import { IPallet } from './Pallet';
export interface IPalletDispatchables extends IPallet {
    at: IAt;
    pallet: string;
    palletIndex: number;
    items: [] | FunctionMetadataLatest[] | Text[];
}
