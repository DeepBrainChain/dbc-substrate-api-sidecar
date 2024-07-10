import { AssetMetadata } from '@polkadot/types/interfaces';
import { PalletAssetsAssetDetails } from '@polkadot/types/lookup';
import { IAt } from '.';
export interface IForeignAssetInfo {
    foreignAssetInfo: PalletAssetsAssetDetails | {};
    foreignAssetMetadata: AssetMetadata;
}
export interface IForeignAssets {
    at: IAt;
    items: IForeignAssetInfo[];
}
