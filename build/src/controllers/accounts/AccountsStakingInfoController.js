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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../../middleware");
const services_1 = require("../../services");
const AbstractController_1 = __importDefault(require("../AbstractController"));
/**
 * GET staking information for an address.
 *
 * Paths:
 * - `address`: The _Stash_ address for staking.
 *
 * Query:
 * - (Optional)`at`: Block at which to retrieve runtime version information at. Block
 * 		identifier, as the block height or block hash. Defaults to most recent block.
 *
 * Returns:
 * - `at`: Block number and hash at which the call was made.
 * - `rewardDestination`: The account to which rewards will be paid. Can be 'Staked' (Stash
 *   account, adding to the amount at stake), 'Stash' (Stash address, not adding to the amount at
 *   stake), 'Controller' (Controller address), or 'Account(AccountId)' (address identified by AccountId).
 * - `controller`: Controller address for the given Stash.
 * - `numSlashingSpans`: Number of slashing spans on Stash account; `null` if provided address is
 *    not a Controller.
 * - `staking`: The staking ledger. Empty object if provided address is not a Controller.
 *   - `stash`: The stash account whose balance is actually locked and at stake.
 *   - `total`: The total amount of the stash's balance that we are currently accounting for.
 *     Simply `active + unlocking`.
 *   - `active`: The total amount of the stash's balance that will be at stake in any forthcoming
 *     eras.
 *   - `unlocking`: Any balance that is becoming free, which may eventually be transferred out of
 *     the stash (assuming it doesn't get slashed first). Represented as an array of objects, each
 *     with an `era` at which `value` will be unlocked.
 *   - `claimedRewards`: Array of eras for which the stakers behind a validator have claimed
 *     rewards. Only updated for _validators._
 *
 * Note: Runtime versions of Kusama less than 1062 will either have `lastReward` in place of
 * `claimedRewards`, or no field at all. This is related to changes in reward distribution. See:
 * - Lazy Payouts: https://github.com/paritytech/substrate/pull/4474
 * - Simple Payouts: https://github.com/paritytech/substrate/pull/5406
 *
 * Substrate Reference:
 * - Staking Pallet: https://crates.parity.io/pallet_staking/index.html
 * - `RewardDestination`: https://crates.parity.io/pallet_staking/enum.RewardDestination.html
 * - `Bonded`: https://crates.parity.io/pallet_staking/struct.Bonded.html
 * - `StakingLedger`: https://crates.parity.io/pallet_staking/struct.StakingLedger.html
 */
class AccountsStakingInfoController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/accounts/:address/staking-info', new services_1.AccountsStakingInfoService(api));
        /**
         * Get the latest account staking summary of `address`.
         *
         * @param req Express Request
         * @param res Express Response
         */
        this.getAccountStakingInfo = async ({ params: { address }, query: { at } }, res) => {
            const hash = await this.getHashFromAt(at);
            AccountsStakingInfoController.sanitizedSend(res, await this.service.fetchAccountStakingInfo(hash, address));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.use(this.path, middleware_1.validateAddress);
        this.safeMountAsyncGetHandlers([['', this.getAccountStakingInfo]]);
    }
}
exports.default = AccountsStakingInfoController;
//# sourceMappingURL=AccountsStakingInfoController.js.map