import { Compact } from '@polkadot/types';
import { BlockHash, BlockNumber, Hash } from '@polkadot/types/interfaces';
import { AccountId } from '@polkadot/types/interfaces/runtime';
import { Codec } from '@polkadot/types/types';
import { IExtrinsic, ISanitizedEvent } from '.';
import { IMessages } from './BlockXCMMessages';
export interface IBlock {
    number: Compact<BlockNumber>;
    hash: BlockHash;
    parentHash: Hash;
    stateRoot: Hash;
    extrinsicsRoot: Hash;
    authorId: AccountId | undefined;
    logs: ILog[];
    onInitialize: IOnInitializeOrFinalize;
    extrinsics: IExtrinsic[];
    onFinalize: IOnInitializeOrFinalize;
    finalized: boolean | undefined;
    decodedXcmMsgs?: IMessages | undefined;
}
interface IOnInitializeOrFinalize {
    events: ISanitizedEvent[];
}
export interface ILog {
    type: string;
    index: number;
    value: Codec;
}
export {};
