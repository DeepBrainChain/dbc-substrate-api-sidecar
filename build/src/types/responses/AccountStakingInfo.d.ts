import type { Option } from '@polkadot/types/codec';
import type { AccountId } from '@polkadot/types/interfaces/runtime';
import type { PalletStakingRewardDestination, PalletStakingStakingLedger } from '@polkadot/types/lookup';
import { IAt } from '.';
export interface IAccountStakingInfo {
    at: IAt;
    controller: AccountId;
    rewardDestination: Option<PalletStakingRewardDestination>;
    numSlashingSpans: number;
    staking: PalletStakingStakingLedger;
}
