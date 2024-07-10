import { ApiDecoration } from '@polkadot/api/types';
import { BlockHash } from '@polkadot/types/interfaces';
import { IAccountBalanceInfo } from '../../types/responses';
import { AbstractService } from '../AbstractService';
export declare class AccountsBalanceInfoService extends AbstractService {
    /**
     * Fetch balance information for an account at a given block.
     * N.B. assumes all non native tokens are from ORML tokens pallet.
     *
     * @param hash `BlockHash` to make call at.
     * @param address Address of the account to get the balance info of.
     * @param token Token to get the balance info of.
     */
    fetchAccountBalanceInfo(hash: BlockHash, historicApi: ApiDecoration<'promise'>, address: string, token: string, denominate: boolean): Promise<IAccountBalanceInfo>;
    /**
     * Apply a denomination to a balance depending on the chains decimal value.
     *
     * @param balance free balance available encoded as Balance. This will be
     * represented as an atomic value.
     * @param dec The chains given decimal token value. It must be > 0, and it
     * is applied to the given atomic value given by the `balance`.
     */
    private applyDenominationBalance;
    /**
     * Parse and denominate the `amount` key in each BalanceLock
     *
     * @param locks A vector containing BalanceLock objects
     * @param dec The chains given decimal value
     */
    private applyDenominationLocks;
    /**
     * Either denominate a value, or return the original Balance as an atomic value.
     *
     * @param denominate Boolean to determine whether or not we denominate a balance
     * @param bal Inputted Balance
     * @param dec Decimal value used to denominate a Balance
     */
    private inDenominationBal;
    /**
     * Either denominate the Balance's within Locks or return the original Locks.
     *
     * @param denominate Boolean to determine whether or not we denominate a balance
     * @param locks Inputted Vec<BalanceLock>, only the amount key will be denominated
     * @param dec Decimal value used to denominate a Balance
     */
    private inDenominationLocks;
}
