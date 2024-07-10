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
exports.AccountsVestingInfoService = void 0;
const http_errors_1 = require("http-errors");
const AbstractService_1 = require("../AbstractService");
class AccountsVestingInfoService extends AbstractService_1.AbstractService {
    /**
     * Fetch vesting information for an account at a given block.
     *
     * @param hash `BlockHash` to make call at
     * @param address address of the account to get the vesting info of
     */
    async fetchAccountVestingInfo(hash, address) {
        const { api } = this;
        const historicApi = await api.at(hash);
        if (!historicApi.query.vesting) {
            throw new http_errors_1.BadRequest(`Vesting pallet does not exist on the specified blocks runtime version`);
        }
        const [{ number }, vesting] = await Promise.all([
            api.rpc.chain.getHeader(hash),
            historicApi.query.vesting.vesting(address),
        ]).catch((err) => {
            throw this.createHttpErrorForAddr(address, err);
        });
        const at = {
            hash,
            height: number.unwrap().toString(10),
        };
        if (vesting.isNone) {
            return {
                at,
                vesting: [],
            };
        }
        else {
            const unwrapVesting = vesting.unwrap();
            return {
                at,
                vesting: Array.isArray(unwrapVesting) ? unwrapVesting : [unwrapVesting],
            };
        }
    }
}
exports.AccountsVestingInfoService = AccountsVestingInfoService;
//# sourceMappingURL=AccountsVestingInfoService.js.map