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
const sanitizeNumbers_1 = require("../../sanitize/sanitizeNumbers");
const polkadotV9110Metadata_1 = require("../../test-helpers/metadata/polkadotV9110Metadata");
const registries_1 = require("../../test-helpers/registries");
const typeFactory_1 = require("../../test-helpers/typeFactory");
const mock_1 = require("../test-helpers/mock");
const vestingInfo789629_json_1 = __importDefault(require("../test-helpers/responses/accounts/vestingInfo789629.json"));
const AccountsVestingInfoService_1 = require("./AccountsVestingInfoService");
const typeFactorApiV9110 = (0, typeFactory_1.createApiWithAugmentations)(polkadotV9110Metadata_1.polkadotMetadataRpcV9110);
const factory = new typeFactory_1.TypeFactory(typeFactorApiV9110);
const vestingRes = {
    locked: '1749990000000000',
    perBlock: '166475460',
    startingBlock: '4961000',
};
const vestingAt = (_address) => Promise.resolve().then(() => {
    const vestingInfo = typeFactorApiV9110.createType('PalletVestingVestingInfo', vestingRes);
    const vecVestingInfo = factory.vecOf([vestingInfo]);
    return factory.optionOf(vecVestingInfo);
});
const historicVestingAt = (_address) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Option<VestingInfo>', vestingRes));
const mockHistoricApi = {
    query: {
        vesting: {
            vesting: vestingAt,
        },
    },
};
const mockApi = {
    ...mock_1.defaultMockApi,
    at: (_hash) => mockHistoricApi,
};
const accountsVestingInfoService = new AccountsVestingInfoService_1.AccountsVestingInfoService(mockApi);
describe('AccountVestingInfoService', () => {
    describe('fetchAccountVestingInfo', () => {
        it('works when ApiPromise works (block 789629) with V14 metadata', async () => {
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(await accountsVestingInfoService.fetchAccountVestingInfo(mock_1.blockHash789629, mock_1.testAddress))).toStrictEqual(vestingInfo789629_json_1.default);
        });
        it('Vesting should return an empty array for None responses', async () => {
            const tempVest = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Option<VestingInfo>', null));
            mockHistoricApi.query.vesting.vesting = tempVest;
            const expectedResponse = {
                at: {
                    hash: '0x7b713de604a99857f6c25eacc115a4f28d2611a23d9ddff99ab0e4f1c17a8578',
                    height: '789629',
                },
                vesting: [],
            };
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(await accountsVestingInfoService.fetchAccountVestingInfo(mock_1.blockHash789629, mock_1.testAddress))).toStrictEqual(expectedResponse);
            mockHistoricApi.query.vesting.vesting = vestingAt;
        });
        it('Should correctly adjust `Option<VestingInfo>` for pre V14 blocks to return an array', async () => {
            mockHistoricApi.query.vesting.vesting = historicVestingAt;
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(await accountsVestingInfoService.fetchAccountVestingInfo(mock_1.blockHash789629, mock_1.testAddress))).toStrictEqual(vestingInfo789629_json_1.default);
            mockHistoricApi.query.vesting.vesting = vestingAt;
        });
    });
});
//# sourceMappingURL=AccountsVestingInfoService.spec.js.map