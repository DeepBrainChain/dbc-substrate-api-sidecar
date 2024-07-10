import type { BlockHash } from '@polkadot/types/interfaces';
import type { u32 } from '@polkadot/types/primitive';
import type { AnyJson } from '@polkadot/types/types';
import { IAt } from '.';
export interface ITransactionMaterial {
    at: IAt;
    genesisHash: BlockHash;
    chainName: string;
    specName: string;
    specVersion: u32;
    txVersion: u32;
    metadata?: string | Record<string, AnyJson>;
}
