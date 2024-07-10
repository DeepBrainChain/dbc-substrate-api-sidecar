import { Option } from '@polkadot/types';
import { AccountId, Hash, StakingLedger } from '@polkadot/types/interfaces';
export declare const bondedAt: (_hash: Hash, _address: string) => Promise<Option<AccountId>>;
export declare const ledgerAt: (_hash: Hash, _address: string) => Promise<Option<StakingLedger>>;
