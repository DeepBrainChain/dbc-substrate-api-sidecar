import { AssetApproval, AssetId, AssetMetadata } from '@polkadot/types/interfaces';
import { PalletAssetsAssetAccount, PalletAssetsAssetDetails } from '@polkadot/types/lookup';
import { Option } from '@polkadot/types-codec/base';
export declare const assetsInfo: () => Promise<PalletAssetsAssetDetails>;
export declare const assetsInfoKeysInjected: () => (() => Promise<PalletAssetsAssetDetails>);
export declare const assetsMetadata: () => Promise<AssetMetadata>;
/**
 * @param assetId options are 10, 20, 30
 */
export declare const assetsAccount: (assetId: number | AssetId, _address: string) => PalletAssetsAssetAccount | undefined;
export declare const assetApprovals: () => Promise<Option<AssetApproval>>;
