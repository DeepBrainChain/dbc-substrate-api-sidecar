import type { BlockHash } from '@polkadot/types/interfaces';
import type { AccountsProxyInfo } from '../../types/responses';
import { AbstractService } from '../AbstractService';
export declare class AccountsProxyInfoService extends AbstractService {
    fetchAccountProxyInfo(hash: BlockHash, address: string): Promise<AccountsProxyInfo>;
}
