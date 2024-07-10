import { GenericExtrinsic, Vec } from '@polkadot/types';
import { BlockHash, Hash } from '@polkadot/types/interfaces';
import { AnyTuple } from '@polkadot/types/types';
import { ILog } from './Block';
export interface IBlockRaw {
    parentHash: BlockHash;
    number: `0x${string}`;
    stateRoot: Hash;
    extrinsicRoot: Hash;
    digest: IDigest;
    extrinsics: Vec<GenericExtrinsic<AnyTuple>>;
}
interface IDigest {
    logs: ILog[];
}
export {};
