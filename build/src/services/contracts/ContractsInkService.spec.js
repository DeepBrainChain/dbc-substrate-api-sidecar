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
const sanitizeNumbers_1 = require("../../sanitize/sanitizeNumbers");
const registries_1 = require("../../test-helpers/registries");
const mock_1 = require("../test-helpers/mock");
const _1 = require(".");
const contractInkService = new _1.ContractsInkService(mock_1.defaultMockApi);
const getFlipper = () => Promise.resolve().then(() => {
    return {
        debugMessage: registries_1.polkadotRegistryV9190.createType('Text', ''),
        gasConsumed: registries_1.polkadotRegistryV9190.createType('u64', '7437907045'),
        gasRequired: registries_1.polkadotRegistryV9190.createType('u64', '74999922688'),
        output: true,
        result: registries_1.polkadotRegistryV9190.createType('ContractExecResultResult', {
            ok: {
                flags: [],
                data: '0x01',
            },
        }),
        storageDeposit: registries_1.polkadotRegistryV9190.createType('StorageDeposit', {
            charge: '0',
        }),
    };
});
const mockContractPromise = {
    query: {
        get: getFlipper,
    },
};
describe('ContractsInkService', () => {
    it('fetchContractCall', async () => {
        const address = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
        const result = await contractInkService.fetchContractCall(mockContractPromise, address, 'get');
        const expectedResponse = {
            debugMessage: '',
            gasConsumed: '7437907045',
            gasRequired: '74999922688',
            output: true,
            result: {
                ok: {
                    flags: [],
                    data: '0x01',
                },
            },
            storageDeposit: {
                charge: '0',
            },
        };
        expect((0, sanitizeNumbers_1.sanitizeNumbers)(result)).toStrictEqual(expectedResponse);
    });
});
//# sourceMappingURL=ContractsInkService.spec.js.map