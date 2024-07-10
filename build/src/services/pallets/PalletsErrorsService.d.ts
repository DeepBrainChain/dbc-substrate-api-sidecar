import { ApiDecoration } from '@polkadot/api/types';
import { BlockHash } from '@polkadot/types/interfaces';
import { IPalletErrors, IPalletErrorsItem } from 'src/types/responses';
import { AbstractPalletsService } from '../AbstractPalletsService';
interface IFetchPalletArgs {
    hash: BlockHash;
    palletId: string;
}
interface IFetchErrorItemArgs extends IFetchPalletArgs {
    errorItemId: string;
    metadata: boolean;
}
export declare class PalletsErrorsService extends AbstractPalletsService {
    fetchErrorItem(historicApi: ApiDecoration<'promise'>, { hash, palletId, errorItemId, metadata }: IFetchErrorItemArgs): Promise<IPalletErrorsItem>;
    fetchErrors(historicApi: ApiDecoration<'promise'>, { hash, palletId, onlyIds }: IFetchPalletArgs & {
        onlyIds: boolean;
    }): Promise<IPalletErrors>;
}
export {};
