import type { DeriveEraExposure } from '@polkadot/api-derive/staking/types';
import type { StorageKey, u32 } from '@polkadot/types';
import type { AccountId32, EraIndex } from '@polkadot/types/interfaces';
import type { SpStakingExposure } from '@polkadot/types/lookup';
/**
 * All data here is gathered using block 15000000, for era 1039.
 */
export declare const ERA = 1039;
export declare const encodedEraExposures: import("@polkadot/types-codec/types").Codec[][];
export declare const erasStakersClippedAt: () => Promise<[StorageKey<[u32, AccountId32]>, SpStakingExposure][]>;
export declare const ledgerAt: () => Promise<import("@polkadot/types").Option<import("@polkadot/types/lookup").PalletStakingStakingLedger>>;
export declare const erasValidatorRewardAt: () => Promise<import("@polkadot/types").Option<import("@polkadot/types").U128>>;
export declare const erasValidatorPrefsAt: () => Promise<import("@polkadot/types/lookup").PalletStakingValidatorPrefs>;
export declare const bondedAt: () => Promise<import("@polkadot/types").Option<AccountId32>>;
export declare const erasRewardPointsAt: (_: EraIndex) => Promise<import("@polkadot/types/lookup").PalletStakingEraRewardPoints>;
export declare const deriveEraExposureParam: DeriveEraExposure;
