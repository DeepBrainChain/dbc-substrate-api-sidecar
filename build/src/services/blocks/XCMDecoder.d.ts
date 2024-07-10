import type { ApiPromise } from '@polkadot/api';
import type { IExtrinsic, IMessages } from '../../types/responses';
declare enum ChainType {
    Relay = "Relay",
    Parachain = "Parachain"
}
export declare class XcmDecoder {
    readonly messages: IMessages;
    readonly api: ApiPromise;
    readonly curChainType: ChainType;
    readonly specName: string;
    constructor(api: ApiPromise, specName: string, extrinsics: IExtrinsic[], paraId?: number);
    private getCurChainType;
    private getMessages;
    private checkMessagesInRelay;
    private decodeMsg;
}
export {};
