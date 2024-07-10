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
exports.createCall = void 0;
const util_1 = require("@polkadot/util");
const decorated_1 = require("./metadata/decorated");
/**
 * Create a polkadot-js Call using decorated metadata. Useful for testing that
 * needs a Call.
 *
 * TODO: This should be switched to polkadotRegistry as we will phase out kusamaRegisty.
 *
 * @param pallet name of pallet in metadata (lowercase)
 * @param method name of method in metadata (lowercase)
 * @param args arguments to call as an object
 */
function createCall(pallet, method, args) {
    // Get the call signature
    const call = decorated_1.decoratedKusamaMetadata.tx[pallet][method];
    return call(
    // Map over arguments to call and key into the users args to get the values
    // We are making the assumption that meta.args will have correct ordering
    ...call.meta.args.map((arg) => {
        return args[(0, util_1.stringCamelCase)(arg.name.toString())];
    }));
}
exports.createCall = createCall;
//# sourceMappingURL=createCall.js.map