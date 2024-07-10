import { ApiDecoration } from '@polkadot/api/types';
import { BlockHash } from '@polkadot/types/interfaces';
import { IPalletDispatchableItem, IPalletDispatchables } from 'src/types/responses';
import { AbstractPalletsService } from '../AbstractPalletsService';
interface IFetchPalletArgs {
    hash: BlockHash;
    palletId: string;
}
interface IFetchDispatchableItemArgs extends IFetchPalletArgs {
    dispatchableItemId: string;
    metadata: boolean;
}
export declare class PalletsDispatchablesService extends AbstractPalletsService {
    fetchDispatchableItem(historicApi: ApiDecoration<'promise'>, { hash, palletId, dispatchableItemId, metadata }: IFetchDispatchableItemArgs): Promise<IPalletDispatchableItem>;
    fetchDispatchables(historicApi: ApiDecoration<'promise'>, { hash, palletId, onlyIds }: IFetchPalletArgs & {
        onlyIds: boolean;
    }): Promise<IPalletDispatchables>;
}
export {};
