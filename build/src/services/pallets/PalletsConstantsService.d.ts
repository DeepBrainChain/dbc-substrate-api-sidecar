import { ApiDecoration } from '@polkadot/api/types';
import { BlockHash } from '@polkadot/types/interfaces';
import { IPalletConstants, IPalletConstantsItem } from 'src/types/responses';
import { AbstractPalletsService } from '../AbstractPalletsService';
interface IFetchPalletArgs {
    hash: BlockHash;
    palletId: string;
}
interface IFetchConstantItemArgs extends IFetchPalletArgs {
    constantItemId: string;
    metadata: boolean;
}
export declare class PalletsConstantsService extends AbstractPalletsService {
    fetchConstantItem(historicApi: ApiDecoration<'promise'>, { hash, palletId, constantItemId, metadata }: IFetchConstantItemArgs): Promise<IPalletConstantsItem>;
    fetchConstants(historicApi: ApiDecoration<'promise'>, { hash, palletId, onlyIds }: IFetchPalletArgs & {
        onlyIds: boolean;
    }): Promise<IPalletConstants>;
}
export {};
