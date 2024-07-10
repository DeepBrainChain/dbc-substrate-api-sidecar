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
const registries_1 = require("../../test-helpers/registries");
const mock_1 = require("../test-helpers/mock");
const feeEstimateInvalid_json_1 = __importDefault(require("../test-helpers/responses/transaction/feeEstimateInvalid.json"));
const feeEstimateValidRpcCall_json_1 = __importDefault(require("../test-helpers/responses/transaction/feeEstimateValidRpcCall.json"));
const feeEstimateValidRuntimeCall_json_1 = __importDefault(require("../test-helpers/responses/transaction/feeEstimateValidRuntimeCall.json"));
const TransactionFeeEstimateService_1 = require("./TransactionFeeEstimateService");
const queryInfoCallAt = () => Promise.resolve().then(() => registries_1.polkadotRegistryV9300.createType('RuntimeDispatchInfoV2', {
    weight: {
        refTime: '133179000',
        proofSize: '0',
    },
    class: 'Normal',
    partialFee: '171607466',
}));
const mockApiAt = {
    call: {
        transactionPaymentApi: {
            queryInfo: queryInfoCallAt,
        },
    },
};
const mockApi = {
    ...mock_1.defaultMockApi,
    at: (_hash) => mockApiAt,
};
const transactionFeeEstimateService = new TransactionFeeEstimateService_1.TransactionFeeEstimateService(mockApi);
describe('TransactionFeeEstimateService', () => {
    describe('fetchTransactionFeeEstimate', () => {
        it('Works with a valid transaction', async () => {
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(await transactionFeeEstimateService.fetchTransactionFeeEstimate(mock_1.blockHash789629, mock_1.balancesTransferValid))).toStrictEqual(feeEstimateValidRuntimeCall_json_1.default);
        });
        it("Should default to the rpc call when the runtime call doesn't exist", async () => {
            mockApiAt.call.transactionPaymentApi.queryInfo = undefined;
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(await transactionFeeEstimateService.fetchTransactionFeeEstimate(mock_1.blockHash789629, mock_1.balancesTransferValid))).toStrictEqual(feeEstimateValidRpcCall_json_1.default);
            mockApiAt.call.transactionPaymentApi.queryInfo = queryInfoCallAt;
        });
        it('Catches ApiPromise throws and then throws the correct error format', async () => {
            const err = new Error('2: Unable to query dispatch info.: Invalid transaction version');
            err.stack =
                'Error: 2: Unable to query dispatch info.: Invalid transaction version\n  ... this is a unit test mock';
            mockApiAt.call.transactionPaymentApi.queryInfo = undefined;
            mockApi.rpc.payment.queryInfo = () => Promise.resolve().then(() => {
                throw err;
            });
            await expect(transactionFeeEstimateService.fetchTransactionFeeEstimate(mock_1.blockHash789629, mock_1.balancesTransferInvalid)).rejects.toStrictEqual(feeEstimateInvalid_json_1.default);
            mockApi.rpc.payment.queryInfo = mock_1.queryInfoAt;
            mockApiAt.call.transactionPaymentApi.queryInfo = queryInfoCallAt;
        });
    });
});
//# sourceMappingURL=TransactionFeeEstimateService.spec.js.map