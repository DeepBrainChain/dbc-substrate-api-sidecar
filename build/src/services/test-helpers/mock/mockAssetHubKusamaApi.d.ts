import type { ApiPromise } from '@polkadot/api';
import type { GenericExtrinsic, Vec } from '@polkadot/types';
import type { Option } from '@polkadot/types/codec';
import type { AccountId, ActiveEraInfo, Block, EraIndex, Extrinsic, Hash, RuntimeDispatchInfoV2, SessionIndex, StakingLedger } from '@polkadot/types/interfaces';
export declare const assetHubKusamaGetBlock: (_hash: Hash) => Promise<{
    block: Block;
}>;
export declare const assetHubKusamaDeriveGetBlock: (_hash: Hash) => Promise<{
    block: Block;
    author: AccountId;
}>;
export declare const assetHubKusamaActiveEraAt: (_hash: Hash) => Promise<Option<ActiveEraInfo>>;
export declare const assetHubKusamaErasStartSessionIndexAt: (_hash: Hash, _activeEra: EraIndex) => Promise<Option<SessionIndex>>;
export declare const assetHubKusamaBondedAt: (_hash: Hash, _address: string) => Promise<Option<AccountId>>;
export declare const assetHubKusamaLedgerAt: (_hash: Hash, _address: string) => Promise<Option<StakingLedger>>;
export declare const assetHubKusamaQueryInfoCall: (_extrinsic: GenericExtrinsic, _length: Uint8Array) => Promise<RuntimeDispatchInfoV2>;
export declare const assetHubKusamaQueryInfoAt: (_extrinsic: string, _hash: Hash) => Promise<RuntimeDispatchInfoV2>;
export declare const assetHubKusamaSubmitExtrinsic: (_extrinsic: string) => Promise<Hash>;
export declare const assetHubKusamaPendingExtrinsics: () => Promise<Vec<Extrinsic>>;
export declare const assetHubKusamaTx: () => Extrinsic;
/**
 * Deafult Mock polkadot-js ApiPromise. Values are largely meant to be accurate for block
 * #523510, which is what most Service unit tests are based on.
 */
export declare const mockAssetHubKusamaApi: ApiPromise;
