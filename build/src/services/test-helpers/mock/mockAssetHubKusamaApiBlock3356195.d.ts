import type { ApiPromise } from '@polkadot/api';
import type { GenericExtrinsic, Vec } from '@polkadot/types';
import type { Option } from '@polkadot/types/codec';
import type { AccountId, ActiveEraInfo, Block, EraIndex, Extrinsic, Hash, RuntimeDispatchInfoV2, SessionIndex, StakingLedger } from '@polkadot/types/interfaces';
export declare const assetHubKusamaGetBlock3356195: (_hash: Hash) => Promise<{
    block: Block;
}>;
export declare const assetHubKusamaDeriveGetBlock3356195: (_hash: Hash) => Promise<{
    block: Block;
    author: AccountId;
}>;
export declare const assetHubKusamaActiveEraAt3356195: (_hash: Hash) => Promise<Option<ActiveEraInfo>>;
export declare const assetHubKusamaErasStartSessionIndexAt3356195: (_hash: Hash, _activeEra: EraIndex) => Promise<Option<SessionIndex>>;
export declare const assetHubKusamaBondedAt3356195: (_hash: Hash, _address: string) => Promise<Option<AccountId>>;
export declare const assetHubKusamaLedgerAt3356195: (_hash: Hash, _address: string) => Promise<Option<StakingLedger>>;
export declare const assetHubKusamaQueryInfoCall3356195: (_extrinsic: GenericExtrinsic, _length: Uint8Array) => Promise<RuntimeDispatchInfoV2>;
export declare const assetHubKusamaQueryInfoAt3356195: (_extrinsic: string, _hash: Hash) => Promise<RuntimeDispatchInfoV2>;
export declare const assetHubKusamaSubmitExtrinsic3356195: (_extrinsic: string) => Promise<Hash>;
export declare const assetHubKusamaPendingExtrinsics3356195: () => Promise<Vec<Extrinsic>>;
export declare const assetHubKusamaTx3356195: () => Extrinsic;
/**
 * Deafult Mock polkadot-js ApiPromise. Values are largely meant to be accurate for block
 * #3356195, which is what most Service unit tests are based on.
 */
export declare const mockAssetHubKusamaApiBlock3356195: ApiPromise;