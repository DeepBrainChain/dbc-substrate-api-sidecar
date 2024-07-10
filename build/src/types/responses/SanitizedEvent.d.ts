import { IEventData } from '@polkadot/types/types';
import { Codec } from '@polkadot/types-codec/types';
import { IFrameMethod } from '.';
export interface ISanitizedEvent {
    method: string | IFrameMethod;
    data: Codec[] & IEventData;
    docs?: string;
}
