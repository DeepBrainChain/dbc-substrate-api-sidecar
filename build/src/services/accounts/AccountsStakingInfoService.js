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
exports.AccountsStakingInfoService = void 0;
const http_errors_1 = require("http-errors");
const AbstractService_1 = require("../AbstractService");
class AccountsStakingInfoService extends AbstractService_1.AbstractService {
    /**
     * Fetch staking information for a _Stash_ account at a given block.
     *
     * @param hash `BlockHash` to make call at
     * @param stash address of the _Stash_  account to get the staking info of
     */
    async fetchAccountStakingInfo(hash, stash) {
        const { api } = this;
        const historicApi = await api.at(hash);
        const [header, controllerOption] = await Promise.all([
            api.rpc.chain.getHeader(hash),
            historicApi.query.staking.bonded(stash), // Option<AccountId> representing the controller
        ]).catch((err) => {
            throw this.createHttpErrorForAddr(stash, err);
        });
        const at = {
            hash,
            height: header.number.unwrap().toString(10),
        };
        if (controllerOption.isNone) {
            throw new http_errors_1.BadRequest(`The address ${stash} is not a stash address.`);
        }
        const controller = controllerOption.unwrap();
        const [stakingLedgerOption, rewardDestination, slashingSpansOption] = await Promise.all([
            historicApi.query.staking.ledger(controller),
            historicApi.query.staking.payee(stash),
            historicApi.query.staking.slashingSpans(stash),
        ]).catch((err) => {
            throw this.createHttpErrorForAddr(stash, err);
        });
        const stakingLedger = stakingLedgerOption.unwrapOr(null);
        if (stakingLedger === null) {
            // should never throw because by time we get here we know we have a bonded pair
            throw new http_errors_1.InternalServerError(`Staking ledger could not be found for controller address "${controller.toString()}"`);
        }
        const numSlashingSpans = slashingSpansOption.isSome ? slashingSpansOption.unwrap().prior.length + 1 : 0;
        return {
            at,
            controller,
            rewardDestination,
            numSlashingSpans,
            staking: stakingLedger,
        };
    }
}
exports.AccountsStakingInfoService = AccountsStakingInfoService;
//# sourceMappingURL=AccountsStakingInfoService.js.map