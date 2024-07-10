import type { ApiPromise } from '@polkadot/api';
import type { GenericExtrinsic, Vec } from '@polkadot/types';
import type { Option } from '@polkadot/types/codec';
import type { AccountId, ActiveEraInfo, Block, EraIndex, Extrinsic, Hash, RuntimeDispatchInfo, SessionIndex, StakingLedger } from '@polkadot/types/interfaces';
export declare const assetHubWestendGetBlock: (_hash: Hash) => Promise<{
    block: Block;
}>;
export declare const assetHubWestendDeriveGetBlock: (_hash: Hash) => Promise<{
    block: Block;
    author: AccountId;
}>;
export declare const assetHubWestendActiveEraAt: (_hash: Hash) => Promise<Option<ActiveEraInfo>>;
export declare const assetHubWestendErasStartSessionIndexAt: (_hash: Hash, _activeEra: EraIndex) => Promise<Option<SessionIndex>>;
export declare const assetHubWestendBondedAt: (_hash: Hash, _address: string) => Promise<Option<AccountId>>;
export declare const assetHubWestendLedgerAt: (_hash: Hash, _address: string) => Promise<Option<StakingLedger>>;
export declare const assetHubWestendQueryInfoCall: (_extrinsic: GenericExtrinsic, _length: Uint8Array) => Promise<RuntimeDispatchInfo>;
export declare const assetHubWestendQueryInfoAt: (_extrinsic: string, _hash: Hash) => Promise<RuntimeDispatchInfo>;
export declare const assetHubWestendSubmitExtrinsic: (_extrinsic: string) => Promise<Hash>;
export declare const assetHubWestendPendingExtrinsics: () => Promise<Vec<Extrinsic>>;
export declare const assetHubWestendTx: () => Extrinsic;
/**
 * Deafult Mock polkadot-js ApiPromise. Values are largely meant to be accurate for block
 * #5236177, which is what most Service unit tests are based on.
 */
export declare const mockAssetHubWestendApi: ApiPromise;
