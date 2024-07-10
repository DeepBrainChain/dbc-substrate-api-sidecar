import type { ApiPromise } from '@polkadot/api';
import type { GenericExtrinsic, Vec } from '@polkadot/types';
import type { Option } from '@polkadot/types/codec';
import type { AccountId, ActiveEraInfo, Block, EraIndex, Extrinsic, Hash, RuntimeDispatchInfo, SessionIndex, StakingLedger } from '@polkadot/types/interfaces';
export declare const getBlockXCM19772575: (_hash: Hash) => Promise<{
    block: Block;
}>;
export declare const deriveGetBlockXCM19772575: (_hash: Hash) => Promise<{
    block: Block;
    author: AccountId;
}>;
export declare const activeEraAtXCM19772575: (_hash: Hash) => Promise<Option<ActiveEraInfo>>;
export declare const erasStartSessionIndexAtXCM19772575: (_hash: Hash, _activeEra: EraIndex) => Promise<Option<SessionIndex>>;
export declare const bondedAtXCM19772575: (_hash: Hash, _address: string) => Promise<Option<AccountId>>;
export declare const ledgerAtXCM19772575: (_hash: Hash, _address: string) => Promise<Option<StakingLedger>>;
export declare const queryInfoCallXCM19772575: (_extrinsic: GenericExtrinsic, _length: Uint8Array) => Promise<RuntimeDispatchInfo>;
export declare const queryInfoAtXCM19772575: (_extrinsic: string, _hash: Hash) => Promise<RuntimeDispatchInfo>;
export declare const submitExtrinsicXCM19772575: (_extrinsic: string) => Promise<Hash>;
export declare const pendingExtrinsicsXCM19772575: () => Promise<Vec<Extrinsic>>;
export declare const txXCM19772575: () => Extrinsic;
/**
 * Mock polkadot-js ApiPromise. Values are largely meant to be accurate for block
 * #18468942, which is what the XCM test in BlockService use.
 */
export declare const mockApiBlock19772575: ApiPromise;
