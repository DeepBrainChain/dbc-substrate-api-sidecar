import { EventMetadataLatest } from '@polkadot/types/interfaces';
import { IPallet, ISanitizedEventItemMetadata } from '.';
export interface IPalletEventsItem extends IPallet {
    eventItem: string;
    metadata: ISanitizedEventItemMetadata | EventMetadataLatest | undefined;
}
