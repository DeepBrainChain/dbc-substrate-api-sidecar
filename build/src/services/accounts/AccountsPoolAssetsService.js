"use strict";
// Copyright 2017-2023 Parity Technologies (UK) Ltd.
// This file is part of Substrate API Sidecar.
//
// Substrate API Sidecar is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsPoolAssetsService = void 0;
const http_errors_1 = require("http-errors");
const AbstractService_1 = require("../AbstractService");
class AccountsPoolAssetsService extends AbstractService_1.AbstractService {
    /**
     * Fetch all the `PoolAssetBalance`s alongside their `AssetId`'s for a given array of queried `AssetId`'s.
     * If none are queried the function will get all `AssetId`'s associated with the
     * given `AccountId`, and send back all the `PoolAssetsBalance`s.
     *
     * @param hash `BlockHash` to make call at
     * @param address `AccountId` associated with the balances
     * @param assets An array of `assetId`'s to be queried. If the length is zero
     * all assetId's associated to the account will be queried
     */
    async fetchPoolAssetBalances(hash, address, assets) {
        const { api } = this;
        const historicApi = await api.at(hash);
        // Check if this runtime has the PoolAssets pallet
        this.checkPoolAssetsError(historicApi);
        const { number } = await api.rpc.chain.getHeader(hash);
        let response;
        if (assets.length === 0) {
            /**
             * This will query all pool assets and return them in an array
             */
            const keys = await historicApi.query.poolAssets.asset.keys();
            const assetIds = this.extractPoolAssetIds(keys);
            response = await this.queryPoolAssets(historicApi, assetIds, address);
        }
        else {
            /**
             * This will query all pool assets by the requested AssetIds
             */
            response = await this.queryPoolAssets(historicApi, assets, address);
        }
        const at = {
            hash,
            height: number.unwrap().toString(10),
        };
        return {
            at,
            poolAssets: response,
        };
    }
    /**
     * Fetch all `AccountApproval`'s with a given `AssetId` and a `AssetApprovalKey`
     * which consists of a `delegate` and an `owner`
     *
     * @param hash `BlockHash` to make call at
     * @param address `AccountId` or owner associated with the approvals
     * @param assetId `AssetId` associated with the `AssetApproval`
     * @param delegate `delegate`
     */
    async fetchPoolAssetApprovals(hash, address, assetId, delegate) {
        const { api } = this;
        const historicApi = await api.at(hash);
        // Check if this runtime has the assets pallet
        this.checkPoolAssetsError(historicApi);
        const [{ number }, assetApproval] = await Promise.all([
            api.rpc.chain.getHeader(hash),
            historicApi.query.poolAssets.approvals(assetId, address, delegate),
        ]).catch((err) => {
            throw this.createHttpErrorForAddr(address, err);
        });
        let amount = null, deposit = null;
        if (assetApproval.isSome) {
            ({ amount, deposit } = assetApproval.unwrap());
        }
        const at = {
            hash,
            height: number.unwrap().toString(10),
        };
        return {
            at,
            amount,
            deposit,
        };
    }
    /**
     * Takes in an array of `AssetId`s, and an `AccountId` and returns
     * all balances tied to those `AssetId`s.
     *
     * @param api ApiPromise
     * @param assets An Array of `AssetId`s or numbers representing `assetId`s
     * @param address An `AccountId` associated with the queried path
     */
    async queryPoolAssets(historicApi, assets, address) {
        return Promise.all(assets.map(async (assetId) => {
            const assetBalance = await historicApi.query.poolAssets.account(assetId, address);
            /**
             * The following checks for three different cases:
             */
            // 1. Via runtime v9160 the updated storage introduces a `reason` field,
            // and polkadot-js wraps the newly returned `PalletAssetsAssetAccount` in an `Option`.
            if (assetBalance.isSome) {
                const balanceProps = assetBalance.unwrap();
                let isFrozen;
                if ('isFrozen' in balanceProps) {
                    isFrozen = balanceProps.isFrozen;
                }
                else {
                    isFrozen = 'isFrozen does not exist for this runtime';
                }
                return {
                    assetId,
                    balance: balanceProps.balance,
                    isFrozen: isFrozen,
                    isSufficient: balanceProps.reason.isSufficient,
                };
            }
            // 2. `query.assets.account()` return `PalletAssetsAssetBalance` which exludes `reasons` but has
            // `sufficient` as a key.
            if (assetBalance.sufficient) {
                const balanceProps = assetBalance;
                return {
                    assetId,
                    balance: balanceProps.balance,
                    isFrozen: balanceProps.isFrozen,
                    isSufficient: balanceProps.sufficient,
                };
            }
            // 3. The older legacy type of `PalletAssetsAssetBalance` has a key of `isSufficient` instead
            // of `sufficient`.
            if (assetBalance['isSufficient']) {
                const balanceProps = assetBalance;
                return {
                    assetId,
                    balance: balanceProps.balance,
                    isFrozen: balanceProps.isFrozen,
                    isSufficient: balanceProps.isSufficient,
                };
            }
            /**
             * This return value wont ever be reached as polkadot-js defaults the
             * `balance` value to `0`, `isFrozen` to false, and `isSufficient` to false.
             * This ensures that the typescript compiler is happy, but we also follow along
             * with polkadot-js/substrate convention.
             */
            return {
                assetId,
                balance: historicApi.registry.createType('u128', 0),
                isFrozen: historicApi.registry.createType('bool', false),
                isSufficient: historicApi.registry.createType('bool', false),
            };
        })).catch((err) => {
            throw this.createHttpErrorForAddr(address, err);
        });
    }
    /**
     * @param keys Extract `assetId`s from an array of storage keys
     */
    extractPoolAssetIds(keys) {
        return keys.map(({ args: [assetId] }) => assetId);
    }
    /**
     * Checks if the historicApi has the pool assets pallet. If not
     * it will throw a BadRequest error.
     *
     * @param historicApi Decorated historic api
     */
    checkPoolAssetsError(historicApi) {
        if (!historicApi.query.poolAssets) {
            throw new http_errors_1.BadRequest(`The runtime does not include the pool assets pallet at this block.`);
        }
    }
}
exports.AccountsPoolAssetsService = AccountsPoolAssetsService;
//# sourceMappingURL=AccountsPoolAssetsService.js.map