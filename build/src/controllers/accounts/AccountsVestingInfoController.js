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
 * GET vesting information for an address.
 *
 * Paths:
 * - `address`: Address to query.
 *
 * Query params:
 * - (Optional)`at`: Block at which to retrieve runtime version information at. Block
 * 		identifier, as the block height or block hash. Defaults to most recent block.
 *
 * Returns:
 * - `at`: Block number and hash at which the call was made.
 * - `vesting`: Vesting schedule for an account.
 *   - `locked`: Number of tokens locked at start.
 *   - `perBlock`: Number of tokens that gets unlocked every block after `startingBlock`.
 *   - `startingBlock`: Starting block for unlocking(vesting).
 *
 * Substrate Reference:
 * - Vesting Pallet: https://crates.parity.io/pallet_vesting/index.html
 * - `VestingInfo`: https://crates.parity.io/pallet_vesting/struct.VestingInfo.html
 */
class AccountsVestingInfoController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/accounts/:address/vesting-info', new services_1.AccountsVestingInfoService(api));
        /**
         * Get vesting information for an account.
         *
         * @param req Express Request
         * @param res Express Response
         */
        this.getAccountVestingInfo = async ({ params: { address }, query: { at } }, res) => {
            const hash = await this.getHashFromAt(at);
            AccountsVestingInfoController.sanitizedSend(res, await this.service.fetchAccountVestingInfo(hash, address));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.use(this.path, middleware_1.validateAddress);
        this.safeMountAsyncGetHandlers([['', this.getAccountVestingInfo]]);
    }
}
exports.default = AccountsVestingInfoController;
//# sourceMappingURL=AccountsVestingInfoController.js.map