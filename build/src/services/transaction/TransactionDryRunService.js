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
exports.TransactionDryRunService = void 0;
const responses_1 = require("../../types/responses");
const AbstractService_1 = require("../AbstractService");
const extractCauseAndStack_1 = require("./extractCauseAndStack");
class TransactionDryRunService extends AbstractService_1.AbstractService {
    async dryRuntExtrinsic(hash, transaction) {
        const { api } = this;
        try {
            const [applyExtrinsicResult, { number }] = await Promise.all([
                api.rpc.system.dryRun(transaction, hash),
                api.rpc.chain.getHeader(hash),
            ]);
            let dryRunResult;
            if (applyExtrinsicResult.isOk) {
                dryRunResult = {
                    resultType: responses_1.TransactionResultType.DispatchOutcome,
                    result: applyExtrinsicResult.asOk,
                };
            }
            else {
                const { asErr } = applyExtrinsicResult;
                dryRunResult = {
                    resultType: responses_1.TransactionResultType.TransactionValidityError,
                    result: asErr.isInvalid ? asErr.asInvalid : asErr.asUnknown,
                    validityErrorType: asErr.isInvalid ? responses_1.ValidityErrorType.Invalid : responses_1.ValidityErrorType.Unknown,
                };
            }
            return {
                at: {
                    hash,
                    height: number.unwrap().toString(10),
                },
                dryRunResult,
            };
        }
        catch (err) {
            const { cause, stack } = (0, extractCauseAndStack_1.extractCauseAndStack)(err);
            throw {
                at: {
                    hash,
                },
                code: 400,
                error: 'Unable to dry-run transaction',
                transaction,
                cause,
                stack,
            };
        }
    }
}
exports.TransactionDryRunService = TransactionDryRunService;
//# sourceMappingURL=TransactionDryRunService.js.map