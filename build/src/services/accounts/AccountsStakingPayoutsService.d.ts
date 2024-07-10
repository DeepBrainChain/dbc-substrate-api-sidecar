import type { ApiDecoration } from '@polkadot/api/types';
import type { DeriveEraExposure, DeriveEraExposureNominating } from '@polkadot/api-derive/staking/types';
import { Option } from '@polkadot/types';
import type { BalanceOf, BlockHash, EraIndex, EraPoints, Perbill } from '@polkadot/types/interfaces';
import type { PalletStakingEraRewardPoints, PalletStakingStakingLedger } from '@polkadot/types/lookup';
import type { IAccountStakingPayouts, IEraPayouts } from '../../types/responses';
import { AbstractService } from '../AbstractService';
/**
 * General information about an era, in tuple form because we initially get it
 * by destructuring a Promise.all(...)
 */
type IErasGeneral = [IAdjustedDeriveEraExposure, PalletStakingEraRewardPoints | EraPoints, Option<BalanceOf>];
/**
 * Index of the validator for eras previous to 518 in Kusama chain.
 */
interface ValidatorIndex {
    [x: string]: number;
}
/**
 * Adapted AdjustedDeriveEraExposure interface for compatibility with eras
 * previous to 518 in Kusama chain.
 */
interface IAdjustedDeriveEraExposure extends DeriveEraExposure {
    validatorIndex?: ValidatorIndex;
}
/**
 * Commission and staking ledger of a validator
 */
interface ICommissionAndLedger {
    commission: Perbill;
    validatorLedger?: PalletStakingStakingLedger;
}
/**
 * All the data we need to calculate payouts for an address at a given era.
 */
interface IEraData {
    deriveEraExposure: IAdjustedDeriveEraExposure;
    eraRewardPoints: PalletStakingEraRewardPoints | EraPoints;
    erasValidatorRewardOption: Option<BalanceOf>;
    exposuresWithCommission?: (ICommissionAndLedger & {
        validatorId: string;
    })[];
    eraIndex: EraIndex;
}
/**
 * Block information relevant for compatibility with eras previous
 * to 518 in Kusama chain.
 */
interface IBlockInfo {
    height: string;
    hash: BlockHash;
}
export interface IEarlyErasBlockInfo {
    [era: string]: {
        start: number;
        end: number;
    };
}
export declare class AccountsStakingPayoutsService extends AbstractService {
    /**
     * Fetch and derive payouts for `address`.
     *
     * @param hash `BlockHash` to make call at
     * @param address address of the _Stash_  account to get the payouts of
     * @param depth number of eras to query at and below the specified era
     * @param era the most recent era to query
     * @param unclaimedOnly whether or not to only show unclaimed payouts
     * @param currentEra The current era
     * @param historicApi Historic api for querying past blocks
     */
    fetchAccountStakingPayout(hash: BlockHash, address: string, depth: number, era: number, unclaimedOnly: boolean, currentEra: number, historicApi: ApiDecoration<'promise'>): Promise<IAccountStakingPayouts>;
    /**
     * Fetch general info about eras in the inclusive range `startEra` .. `era`.
     *
     * @param historicApi Historic api for querying past blocks
     * @param startEra first era to get data for
     * @param era the last era to get data for
     * @param blockNumber block information to ensure compatibility with older eras
     */
    fetchAllErasGeneral(historicApi: ApiDecoration<'promise'>, startEra: number, era: number, blockNumber: IBlockInfo, isKusama: boolean): Promise<IErasGeneral[]>;
    private fetchHistoricRewardPoints;
    /**
     * Fetch the commission & staking ledger for each `validatorId` in `deriveErasExposures`.
     *
     * @param historicApi Historic api for querying past blocks
     * @param address address of the _Stash_  account to get the payouts of
     * @param startEra first era to get data for
     * @param deriveErasExposures exposures per era for `address`
     */
    fetchAllErasCommissions(historicApi: ApiDecoration<'promise'>, address: string, startEra: number, deriveErasExposures: IAdjustedDeriveEraExposure[], isKusama: boolean): Promise<ICommissionAndLedger[][]>;
    /**
     * Derive all the payouts for `address` at `era`.
     *
     * @param address address of the _Stash_  account to get the payouts of
     * @param era the era to query
     * @param eraData data about the address and era we are calculating payouts for
     */
    deriveEraPayouts(address: string, unclaimedOnly: boolean, { deriveEraExposure, eraRewardPoints, erasValidatorRewardOption, exposuresWithCommission, eraIndex }: IEraData, isKusama: boolean): IEraPayouts | {
        message: string;
    };
    /**
     * Fetch the `commission` and `StakingLedger` of `validatorId`.
     *
     * @param historicApi Historic api for querying past blocks
     * @param validatorId accountId of a validator's _Stash_  account
     * @param era the era to query
     * @param validatorLedgerCache object mapping validatorId => StakingLedger to limit redundant queries
     */
    private fetchCommissionAndLedger;
    /**
     * Copyright 2024 via polkadot-js/api
     * The following code was adopted by https://github.com/polkadot-js/api/blob/3bdf49b0428a62f16b3222b9a31bfefa43c1ca55/packages/api-derive/src/staking/erasExposure.ts.
     *
     * The original version uses the base ApiDerive implementation which does not include the ApiDecoration implementation.
     * It is required in this version to query older blocks for their historic data.
     *
     * @param historicApi Historic api for querying past blocks
     * @param eraIndex index of the era to query
     */
    private deriveEraExposure;
    /**
     * Extract the reward points of `validatorId` from `EraRewardPoints`.
     *
     * @param eraRewardPoints
     * @param validatorId accountId of a validator's _Stash_  account
     * @param validatorIndex index of the validator in relation to the `EraPoints`
     * array
     * */
    private extractTotalValidatorRewardPoints;
    /**
     * Extract the exposure of `address` and `totalExposure`
     * from polkadot-js's `deriveEraExposure`.
     *
     * @param address address of the _Stash_  account to get the exposure of behind `validatorId`
     * @param validatorId accountId of a validator's _Stash_  account
     * @param deriveEraExposure result of deriveEraExposure
     */
    private extractExposure;
    /**
     * Derive the list of validators nominated by `address`. Note: we count validators as nominating
     * themself.
     *
     * @param address address of the _Stash_  account to get the payouts of
     * @param deriveEraExposure result of deriveEraExposure
     */
    deriveNominatedExposures(address: string, deriveEraExposure: IAdjustedDeriveEraExposure): DeriveEraExposureNominating[] | undefined;
}
export {};
