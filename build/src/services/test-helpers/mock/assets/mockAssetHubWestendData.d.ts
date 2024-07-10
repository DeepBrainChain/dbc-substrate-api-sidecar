import { AssetApproval, AssetId, AssetMetadata } from '@polkadot/types/interfaces';
import { PalletAssetsAssetAccount, PalletAssetsAssetDetails } from '@polkadot/types/lookup';
import { Option } from '@polkadot/types-codec/base';
export declare const poolAssetsInfo: () => Promise<PalletAssetsAssetDetails>;
export declare const poolAssetsInfoKeysInjected: () => (() => Promise<PalletAssetsAssetDetails>);
export declare const poolAssetsMetadata: () => Promise<AssetMetadata>;
/**
 * @param assetId options are 0, 21, 29
 */
export declare const poolAssetsAccount: (assetId: number | AssetId, _address: string) => PalletAssetsAssetAccount | undefined;
export declare const poolAssetApprovals: () => Promise<Option<AssetApproval>>;
