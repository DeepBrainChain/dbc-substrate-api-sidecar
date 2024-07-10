import type { ApiPromise } from '@polkadot/api';
import type { GenericExtrinsic, Vec } from '@polkadot/types';
import type { Option } from '@polkadot/types/codec';
import type { AccountId, ActiveEraInfo, Block, EraIndex, Extrinsic, Hash, RuntimeDispatchInfoV2, SessionIndex, StakingLedger } from '@polkadot/types/interfaces';
export declare const assetHubKusamaGetBlock6202603: (_hash: Hash) => Promise<{
    block: Block;
}>;
export declare const assetHubKusamaDeriveGetBlock6202603: (_hash: Hash) => Promise<{
    block: Block;
    author: AccountId;
}>;
export declare const assetHubKusamaActiveEraAt6202603: (_hash: Hash) => Promise<Option<ActiveEraInfo>>;
export declare const assetHubKusamaErasStartSessionIndexAt6202603: (_hash: Hash, _activeEra: EraIndex) => Promise<Option<SessionIndex>>;
export declare const assetHubKusamaBondedAt6202603: (_hash: Hash, _address: string) => Promise<Option<AccountId>>;
export declare const assetHubKusamaLedgerAt6202603: (_hash: Hash, _address: string) => Promise<Option<StakingLedger>>;
export declare const assetHubKusamaQueryInfoCall6202603: (_extrinsic: GenericExtrinsic, _length: Uint8Array) => Promise<RuntimeDispatchInfoV2>;
export declare const assetHubKusamaQueryInfoAt6202603: (_extrinsic: string, _hash: Hash) => Promise<RuntimeDispatchInfoV2>;
export declare const assetHubKusamaSubmitExtrinsic6202603: (_extrinsic: string) => Promise<Hash>;
export declare const assetHubKusamaPendingExtrinsics6202603: () => Promise<Vec<Extrinsic>>;
export declare const assetHubKusamaTx6202603: () => Extrinsic;
/**
 * Deafult Mock polkadot-js ApiPromise. Values are largely meant to be accurate for block
 * #6202603, which is what most Service unit tests are based on.
 */
export declare const mockAssetHubKusamaApiBlock6202603: ApiPromise;
