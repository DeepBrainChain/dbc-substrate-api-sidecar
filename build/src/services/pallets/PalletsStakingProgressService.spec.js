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
const http_errors_1 = require("http-errors");
const sanitizeNumbers_1 = require("../../sanitize/sanitizeNumbers");
const registries_1 = require("../../test-helpers/registries");
const mock_1 = require("../test-helpers/mock");
const validators789629Hex_1 = require("../test-helpers/mock/data/validators789629Hex");
const stakingProgress789629_json_1 = __importDefault(require("../test-helpers/responses/pallets/stakingProgress789629.json"));
const PalletsStakingProgressService_1 = require("./PalletsStakingProgressService");
const epochIndexAt = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('u64', 330));
const genesisSlotAt = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('u64', 265084563));
const currentSlotAt = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('u64', 265876724));
const currentIndexAt = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('SessionIndex', 330));
const eraElectionStatusAt = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('ElectionStatus', { Close: null }));
const validatorsAt = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Vec<ValidatorId>', validators789629Hex_1.validators789629Hex));
const forceEraAt = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Forcing', 'NotForcing'));
const unappliedSlashesAt = (_activeEra) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Vec<UnappliedSlash>', []));
const validatorCountAt = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('u32', 197));
const mockHistoricApi = {
    consts: {
        babe: {
            epochDuration: registries_1.polkadotRegistry.createType('u64', 2400),
        },
        staking: {
            electionLookAhead: registries_1.polkadotRegistry.createType('BlockNumber'),
            sessionsPerEra: registries_1.polkadotRegistry.createType('SessionIndex', 6),
        },
    },
    query: {
        babe: {
            currentSlot: currentSlotAt,
            epochIndex: epochIndexAt,
            genesisSlot: genesisSlotAt,
        },
        session: {
            currentIndex: currentIndexAt,
            validators: validatorsAt,
        },
        staking: {
            activeEra: mock_1.activeEraAt,
            eraElectionStatus: eraElectionStatusAt,
            erasStartSessionIndex: mock_1.erasStartSessionIndexAt,
            forceEra: forceEraAt,
            unappliedSlashes: unappliedSlashesAt,
            validatorCount: validatorCountAt,
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
const palletStakingProgressService = new PalletsStakingProgressService_1.PalletsStakingProgressService(mockApi);
describe('PalletStakingProgressService', () => {
    describe('derivePalletStakingProgress', () => {
        mockHistoricApi.query.session.validators = validatorsAt;
        it('works when ApiPromise works (block 789629)', async () => {
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(await palletStakingProgressService.derivePalletStakingProgress(mock_1.blockHash789629))).toStrictEqual(stakingProgress789629_json_1.default);
        });
        it('throws when ErasStartSessionIndex.isNone', async () => {
            mockHistoricApi.query.staking.erasStartSessionIndex = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Option<SessionIndex>', null));
            await expect(palletStakingProgressService.derivePalletStakingProgress(mock_1.blockHash789629)).rejects.toStrictEqual(new http_errors_1.InternalServerError('EraStartSessionIndex is None when Some was expected.'));
            mockHistoricApi.query.staking.erasStartSessionIndex = mock_1.erasStartSessionIndexAt;
        });
        it('throws when activeEra.isNone', async () => {
            mockHistoricApi.query.staking.activeEra = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Option<ActiveEraInfo>', null));
            await expect(palletStakingProgressService.derivePalletStakingProgress(mock_1.blockHash789629)).rejects.toStrictEqual(new http_errors_1.InternalServerError('ActiveEra is None when Some was expected.'));
            mockHistoricApi.query.staking.activeEra = mock_1.activeEraAt;
            mockHistoricApi.query.session.validators = validatorsAt;
        });
    });
});
//# sourceMappingURL=PalletsStakingProgressService.spec.js.map