"use strict";
// Copyright 2017-2022 Parity Technologies (UK) Ltd.
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
exports.AccountsAssetsService = void 0;
const http_errors_1 = require("http-errors");
const AbstractService_1 = require("../AbstractService");
class AccountsAssetsService extends AbstractService_1.AbstractService {
    /**
     * Fetch all the `AssetBalance`s alongside their `AssetId`'s for a given array of queried `AssetId`'s.
     * If none are queried the function will get all `AssetId`'s associated with the
     * given `AccountId`, and send back all the `AssetsBalance`s.
     *
     * @param hash `BlockHash` to make call at
     * @param address `AccountId` associated with the balances
     * @param assets An array of `assetId`'s to be queried. If the length is zero
     * all assetId's associated to the account will be queried
     */
    async fetchAssetBalances(hash, address, assets) {
        const { api } = this;
        const historicApi = await api.at(hash);
        // Check if this runtime has the assets pallet
        this.checkAssetsError(historicApi);
        const { number } = await api.rpc.chain.getHeader(hash);
        let response;
        if (assets.length === 0) {
            /**
             * This will query all assets and return them in an array
             */
            const keys = await historicApi.query.assets.asset.keys();
            const assetIds = this.extractAssetIds(keys);
            response = await this.queryAssets(historicApi, assetIds, address);
        }
        else {
            /**
             * This will query all assets by the requested AssetIds
             */
            response = await this.queryAssets(historicApi, assets, address);
        }
        const at = {
            hash,
            height: number.unwrap().toString(10),
        };
        return {
            at,
            assets: response,
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
    async fetchAssetApproval(hash, address, assetId, delegate) {
        const { api } = this;
        const historicApi = await api.at(hash);
        // Check if this runtime has the assets pallet
        this.checkAssetsError(historicApi);
        const [{ number }, assetApproval] = await Promise.all([
            api.rpc.chain.getHeader(hash),
            historicApi.query.assets.approvals(assetId, address, delegate),
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
    async queryAssets(historicApi, assets, address) {
        return Promise.all(assets.map(async (assetId) => {
            const assetBalance = await historicApi.query.assets.account(assetId, address);
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
    extractAssetIds(keys) {
        return keys.map(({ args: [assetId] }) => assetId);
    }
    /**
     * Checks if the historicApi has the assets pallet. If not
     * it will throw a BadRequest error.
     *
     * @param historicApi Decorated historic api
     */
    checkAssetsError(historicApi) {
        if (!historicApi.query.assets) {
            throw new http_errors_1.BadRequest(`The runtime does not include the assets pallet at this block.`);
        }
    }
}
exports.AccountsAssetsService = AccountsAssetsService;
//# sourceMappingURL=AccountsAssetsService.js.map