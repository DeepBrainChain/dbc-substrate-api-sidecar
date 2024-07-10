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
exports.PRE_SANITIZED_RUNTIME_DISPATCH_INFO = exports.PRE_SANITIZED_OPTION_VESTING_INFO = exports.PRE_SANITIZED_BALANCE_LOCK = exports.PRE_SANITIZED_STAKING_RESPONSE = exports.PRE_SANITIZED_AT = void 0;
const constants_1 = require("../test-helpers/constants");
const registries_1 = require("../test-helpers/registries");
/**
 * An 'at' object, which has not been sanitized by `sanitizeNumbers`.
 */
exports.PRE_SANITIZED_AT = {
    height: '2669784',
    hash: registries_1.kusamaRegistry.createType('BlockHash', '0x5f2a8b33c24368148982c37aefe77d5724f5aca0bcae1a599e2a4634c1f0fab2'),
};
/**
 * A dummy return value to fetchStakingLedger which has not been run through `sanitizeNumbers`.
 */
exports.PRE_SANITIZED_STAKING_RESPONSE = {
    at: exports.PRE_SANITIZED_AT,
    staking: registries_1.kusamaRegistry.createType('StakingLedger', {
        stash: '5DRihWfVSmhbk25D4VRSjacZTtrnv8w8qnGttLmfro5MCPgm',
        total: '0x0000000000000000ff49f24a6a9c00',
        active: '0x0000000000000000ff49f24a6a9100',
        unlocking: [],
        claimedRewards: [],
    }),
};
exports.PRE_SANITIZED_BALANCE_LOCK = registries_1.kusamaRegistry.createType('Vec<BalanceLock>', [
    {
        id: '00000000',
        amount: registries_1.kusamaRegistry.createType('Balance', '0x0000000000000000ff49f24a6a9c00'),
        reasons: 'misc',
    },
]);
exports.PRE_SANITIZED_OPTION_VESTING_INFO = registries_1.kusamaRegistry.createType('Option<VestingInfo>', {
    locked: '0x0000000000000000ff49f24a6a9c00',
    perBlock: '0x0000000000000000ff49f24a6a9100',
    startingBlock: '299694200',
});
exports.PRE_SANITIZED_RUNTIME_DISPATCH_INFO = registries_1.kusamaRegistry.createType('RuntimeDispatchInfo', {
    weight: constants_1.MAX_U64,
    class: 'operational',
    partialFee: constants_1.MAX_U128,
});
//# sourceMappingURL=mockData.js.map