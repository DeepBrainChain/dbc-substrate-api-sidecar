import { ApiPromise } from '@polkadot/api';
import { GenericExtrinsic, Vec } from '@polkadot/types';
import { Option } from '@polkadot/types/codec';
import { AccountId, ActiveEraInfo, Block, EraIndex, Extrinsic, Hash, RuntimeDispatchInfo, SessionIndex, StakingLedger } from '@polkadot/types/interfaces';
export declare const getBlock: (_hash: Hash) => Promise<{
    block: Block;
}>;
export declare const deriveGetBlock: (_hash: Hash) => Promise<{
    block: Block;
    author: AccountId;
}>;
export declare const activeEraAt: (_hash: Hash) => Promise<Option<ActiveEraInfo>>;
export declare const erasStartSessionIndexAt: (_hash: Hash, _activeEra: EraIndex) => Promise<Option<SessionIndex>>;
export declare const bondedAt: (_hash: Hash, _address: string) => Promise<Option<AccountId>>;
export declare const ledgerAt: (_hash: Hash, _address: string) => Promise<Option<StakingLedger>>;
export declare const queryInfoCall: (_extrinsic: GenericExtrinsic, _length: Uint8Array) => Promise<RuntimeDispatchInfo>;
export declare const queryInfoAt: (_extrinsic: string, _hash: Hash) => Promise<RuntimeDispatchInfo>;
export declare const submitExtrinsic: (_extrinsic: string) => Promise<Hash>;
export declare const pendingExtrinsics: () => Promise<Vec<Extrinsic>>;
export declare const tx: () => Extrinsic;
/**
 * Deafult Mock polkadot-js ApiPromise. Values are largely meant to be accurate for block
 * #789629, which is what most Service unit tests are based on.
 */
export declare const defaultMockApi: ApiPromise;
