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
const registries_1 = require("../../test-helpers/registries");
const mock_1 = require("../test-helpers/mock");
const submitFailParse_json_1 = __importDefault(require("../test-helpers/responses/transaction/submitFailParse.json"));
const submitNodeReject_json_1 = __importDefault(require("../test-helpers/responses/transaction/submitNodeReject.json"));
const TransactionSubmitService_1 = require("./TransactionSubmitService");
const mockApi = {
    ...mock_1.defaultMockApi,
    tx: mock_1.tx,
};
const transactionSubmitService = new TransactionSubmitService_1.TransactionSubmitService(mockApi);
describe('TransactionSubmitService', () => {
    describe('submitTransaction', () => {
        it('works with a valid a transaction', async () => {
            return expect(transactionSubmitService.submitTransaction(mock_1.balancesTransferValid)).resolves.toStrictEqual({
                hash: registries_1.polkadotRegistry.createType('Hash'),
            });
        });
        it('throws with "Failed to parse a transaction" when tx is not parsable', async () => {
            const err = new Error(
            // eslint-disable-next-line no-useless-escape
            `createType(ExtrinsicV4):: Struct: failed on 'signature':: Struct: cannot decode type Type with value \"0x250284d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d01022f4deae1532ddd0\"`);
            err.stack = 'Error: createType(ExtrinsicV4):: Struct: failed ... this is a unit test mock';
            mockApi.tx = () => {
                throw err;
            };
            await expect(transactionSubmitService.submitTransaction(mock_1.balancesTransferInvalid)).rejects.toStrictEqual(submitFailParse_json_1.default);
            mockApi.tx = mock_1.tx;
        });
        it('throws with "Failed to submit transaction" when the node rejects the transaction', async () => {
            const err = new Error('1012: Transaction is temporarily banned');
            err.stack = 'Error: 1012: Transaction is temporarily banned ... this is a unit test mock';
            mockApi.rpc.author.submitExtrinsic = () => Promise.resolve().then(() => {
                throw err;
            });
            await expect(transactionSubmitService.submitTransaction(mock_1.balancesTransferValid)).rejects.toStrictEqual(submitNodeReject_json_1.default);
            mockApi.rpc.author.submitExtrinsic = mock_1.submitExtrinsic;
        });
    });
});
//# sourceMappingURL=TransactionSubmitService.spec.js.map