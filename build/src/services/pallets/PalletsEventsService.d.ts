import { ApiDecoration } from '@polkadot/api/types';
import { BlockHash } from '@polkadot/types/interfaces';
import { IPalletEvents, IPalletEventsItem } from 'src/types/responses';
import { AbstractPalletsService } from '../AbstractPalletsService';
interface IFetchPalletArgs {
    hash: BlockHash;
    palletId: string;
}
interface IFetchEventItemArgs extends IFetchPalletArgs {
    eventItemId: string;
    metadata: boolean;
}
export declare class PalletsEventsService extends AbstractPalletsService {
    fetchEventItem(historicApi: ApiDecoration<'promise'>, { hash, palletId, eventItemId, metadata }: IFetchEventItemArgs): Promise<IPalletEventsItem>;
    fetchEvents(historicApi: ApiDecoration<'promise'>, { hash, palletId, onlyIds }: IFetchPalletArgs & {
        onlyIds: boolean;
    }): Promise<IPalletEvents>;
}
export {};
