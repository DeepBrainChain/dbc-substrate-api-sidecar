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
exports.balancesDepositEvent = exports.treasuryEvent = exports.withdrawEventForTip = exports.withdrawEvent = exports.constructEvent = void 0;
const registries_1 = require("../../../../test-helpers/registries");
/**
 * Construct a Vec type. We are only concerned with the Balances here, therefore in order to not
 * have to construct a `Codec[] & IEventData` type which takes a large amount of boilerplate
 * we use this shortcut by creating a `Vec<Balance>` type which represents exactly what we need
 * to construct the `data` for an `ISanitizedEvent`.
 */
const constructCodecData = (data) => {
    return registries_1.polkadotRegistry.createType('Vec<Balance>', data.map((val) => val.startsWith('0x')
        ? registries_1.polkadotRegistry.createType('AccountId', val)
        : registries_1.polkadotRegistry.createType('Balance', val)));
};
/**
 *  Construct events for testing.
 */
const constructEvent = (pallet, method, data) => {
    return {
        method: {
            pallet,
            method,
        },
        data: constructCodecData(data),
    };
};
exports.constructEvent = constructEvent;
exports.withdrawEvent = [(0, exports.constructEvent)('balances', 'Withdraw', ['0x', '2490128143'])];
exports.withdrawEventForTip = [(0, exports.constructEvent)('balances', 'Withdraw', ['0x', '1681144907847007'])];
exports.treasuryEvent = [
    // Set the fee inside of the data for withdraw 1 decimal larger than expected.
    (0, exports.constructEvent)('balances', 'Withdraw', ['0x', '24901281430']),
    (0, exports.constructEvent)('treasury', 'Deposit', ['2490128143']),
];
exports.balancesDepositEvent = [
    (0, exports.constructEvent)('balances', 'Withdraw', ['0x', '24901281430']),
    (0, exports.constructEvent)('treasury', 'Deposit', ['24901281430']),
    (0, exports.constructEvent)('balances', 'Deposit', ['0x', '1245064072']),
    (0, exports.constructEvent)('balances', 'Deposit', ['0x', '1245064071']),
];
//# sourceMappingURL=mockEventData.js.map