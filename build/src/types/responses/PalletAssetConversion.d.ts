import { Option } from '@polkadot/types/codec';
import type { FrameSupportTokensFungibleUnionOfNativeOrWithId, PalletAssetConversionPoolInfo, StagingXcmV3MultiLocation } from '@polkadot/types/lookup';
import { Codec } from '@polkadot/types/types';
import type { ITuple } from '@polkadot/types-codec/types';
import { IAt } from '.';
export interface ILiquidityId {
    at: IAt;
    poolId: Option<Codec> | string;
}
export interface ILiquidityPoolsInfo {
    reserves: ITuple<[
        FrameSupportTokensFungibleUnionOfNativeOrWithId | StagingXcmV3MultiLocation,
        FrameSupportTokensFungibleUnionOfNativeOrWithId | StagingXcmV3MultiLocation
    ]>;
    lpToken: Option<PalletAssetConversionPoolInfo>;
}
export interface ILiquidityPools {
    at: IAt;
    pools: ILiquidityPoolsInfo[];
}
