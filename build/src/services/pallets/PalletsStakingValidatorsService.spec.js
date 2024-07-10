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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sanitizeNumbers_1 = require("../../sanitize/sanitizeNumbers");
const registries_1 = require("../../test-helpers/registries");
const mock_1 = require("../test-helpers/mock");
const validator14815152Entries_1 = require("../test-helpers/mock/data/validator14815152Entries");
const validators14815152Hex_1 = require("../test-helpers/mock/data/validators14815152Hex");
const fetchValidators14815152_json_1 = __importDefault(require("../test-helpers/responses/pallets/fetchValidators14815152.json"));
const PalletsStakingValidatorsService_1 = require("./PalletsStakingValidatorsService");
const validatorsAt = () => Promise.resolve().then(() => registries_1.polkadotRegistryV9370.createType('Vec<AccountId32>', validators14815152Hex_1.validators14815152Hex));
const validatorsEntriesAt = () => Promise.resolve().then(() => (0, validator14815152Entries_1.validatorsEntries)());
const mockHistoricApi = {
    query: {
        session: {
            validators: validatorsAt,
        },
        staking: {
            validators: {
                entries: validatorsEntriesAt,
            },
        },
    },
};
const mockApi = {
    ...mock_1.defaultMockApi,
    at: (_hash) => mockHistoricApi,
};
/**
 * Mock PalletStakingProgressService instance.
 */
const palletsStakingValidatorsService = new PalletsStakingValidatorsService_1.PalletsStakingValidatorsService(mockApi);
describe('PalletsStakingValidatorsService', () => {
    describe('derivePalletStakingValidators', () => {
        it('Works for block 14815152', async () => {
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(
            // The inputted blockHash does not change the tests since the mocked data is all based
            // on block 14815152
            await palletsStakingValidatorsService.derivePalletStakingValidators(mock_1.blockHash789629))).toStrictEqual(fetchValidators14815152_json_1.default);
        });
    });
});
//# sourceMappingURL=PalletsStakingValidatorsService.spec.js.map