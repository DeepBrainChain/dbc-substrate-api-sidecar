import { AssetMetadata } from '@polkadot/types/interfaces';
import { PalletAssetsAssetDetails } from '@polkadot/types/lookup';
import { Option } from '@polkadot/types-codec/base';
export declare const foreignAssetsInfo: (() => Option<PalletAssetsAssetDetails>)[];
export declare const foreignAssetsMetadata: (location: string) => AssetMetadata;
