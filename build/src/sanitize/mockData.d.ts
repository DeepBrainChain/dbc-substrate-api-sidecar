/**
 * An 'at' object, which has not been sanitized by `sanitizeNumbers`.
 */
export declare const PRE_SANITIZED_AT: {
    height: string;
    hash: import("@polkadot/types/interfaces").BlockHash;
};
/**
 * A dummy return value to fetchStakingLedger which has not been run through `sanitizeNumbers`.
 */
export declare const PRE_SANITIZED_STAKING_RESPONSE: {
    at: {
        height: string;
        hash: import("@polkadot/types/interfaces").BlockHash;
    };
    staking: import("@polkadot/types/interfaces").StakingLedger;
};
export declare const PRE_SANITIZED_BALANCE_LOCK: import("@polkadot/types-codec").Vec<import("@polkadot/types/interfaces").BalanceLock>;
export declare const PRE_SANITIZED_OPTION_VESTING_INFO: import("@polkadot/types-codec").Option<import("@polkadot/types/interfaces").VestingInfo>;
export declare const PRE_SANITIZED_RUNTIME_DISPATCH_INFO: import("@polkadot/types/interfaces").RuntimeDispatchInfo;
