import type { u128, Vec } from '@polkadot/types';
import type { PalletProxyProxyDefinition } from '@polkadot/types/lookup';
import type { IAt } from './';
export interface AccountsProxyInfo {
    at: IAt;
    delegatedAccounts: Vec<PalletProxyProxyDefinition>;
    depositHeld: u128;
}
