import { Option } from '@polkadot/types/codec';
import { PalletNominationPoolsBondedPoolInner, PalletNominationPoolsRewardPool } from '@polkadot/types/lookup';
import { u32, u128 } from '@polkadot/types-codec';
import { IAt } from '.';
export interface IPalletNominationPool {
    at: IAt;
    bondedPool: Option<PalletNominationPoolsBondedPoolInner>;
    rewardPool: Option<PalletNominationPoolsRewardPool>;
    metadata?: string | null;
}
export interface IPalletNominationPoolInfo {
    at: IAt;
    counterForBondedPools: u32;
    counterForMetadata: u32;
    counterForPoolMembers: u32;
    counterForReversePoolIdLookup: u32;
    counterForRewardPools: u32;
    counterForSubPoolsStorage: u32;
    lastPoolId: u32;
    maxPoolMembers: Option<u32>;
    maxPoolMembersPerPool: Option<u32>;
    maxPools: Option<u32>;
    minCreateBond: u128;
    minJoinBond: u128;
}
