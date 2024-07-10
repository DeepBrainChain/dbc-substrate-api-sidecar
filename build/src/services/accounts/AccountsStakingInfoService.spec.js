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
exports.ledgerAt = exports.bondedAt = void 0;
const http_errors_1 = require("http-errors");
const sanitizeNumbers_1 = require("../../sanitize/sanitizeNumbers");
const registries_1 = require("../../test-helpers/registries");
const mock_1 = require("../test-helpers/mock");
const stakingInfo789629_json_1 = __importDefault(require("../test-helpers/responses/accounts/stakingInfo789629.json"));
const AccountsStakingInfoService_1 = require("./AccountsStakingInfoService");
const bondedAt = (_hash, _address) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Option<AccountId>', mock_1.testAddressController));
exports.bondedAt = bondedAt;
const ledgerAt = (_hash, _address) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Option<StakingLedger>', '0x2c2a55b5e0d28cc772b47bb9b25981cbb69eca73f7c3388fb6464e7d24be470e0700e87648170700e8764817008c000000000100000002000000030000000400000005000000060000000700000008000000090000001700000018000000190000001a0000001b0000001c0000001d0000001e0000001f000000200000002100000022000000230000002400000025000000260000002700000028000000290000002a0000002b0000002c0000002d0000002e0000002f000000'));
exports.ledgerAt = ledgerAt;
const payeeAt = (_hash, _address) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('RewardDestination', 'Controller'));
const slashingSpansAt = (_hash, _address) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('SlashingSpans'));
const historicApi = {
    query: {
        staking: {
            bonded: exports.bondedAt,
            ledger: exports.ledgerAt,
            payee: payeeAt,
            slashingSpans: slashingSpansAt,
        },
    },
};
const mockApi = {
    ...mock_1.defaultMockApi,
    at: (_hash) => historicApi,
};
const accountStakingInfoService = new AccountsStakingInfoService_1.AccountsStakingInfoService(mockApi);
describe('AccountsStakingInfoService', () => {
    describe('fetchAccountStakingInfo', () => {
        it('works with a valid stash address (block 789629)', async () => {
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(await accountStakingInfoService.fetchAccountStakingInfo(mock_1.blockHash789629, mock_1.testAddress))).toStrictEqual(stakingInfo789629_json_1.default);
        });
        it('throws a 400 when the given address is not a stash', async () => {
            historicApi.query.staking.bonded = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Option<AccountId>', null));
            await expect(accountStakingInfoService.fetchAccountStakingInfo(mock_1.blockHash789629, 'NotStash')).rejects.toStrictEqual(new http_errors_1.BadRequest('The address NotStash is not a stash address.'));
            historicApi.query.staking.bonded = exports.bondedAt;
        });
        it('throws a 404 when the staking ledger cannot be found', async () => {
            historicApi.query.staking.ledger = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Option<StakingLedger>', null));
            await expect(accountStakingInfoService.fetchAccountStakingInfo(mock_1.blockHash789629, mock_1.testAddress)).rejects.toStrictEqual(new http_errors_1.InternalServerError(`Staking ledger could not be found for controller address "${mock_1.testAddressController.toString()}"`));
            historicApi.query.staking.ledger = exports.ledgerAt;
        });
    });
});
//# sourceMappingURL=AccountsStakingInfoService.spec.js.map