import { DispatchOutcome, InvalidTransaction, UnknownTransaction } from '@polkadot/types/interfaces';
import { IAt } from '.';
export declare enum TransactionResultType {
    TransactionValidityError = "TransactionValidityError",
    DispatchOutcome = "DispatchOutcome"
}
export declare enum ValidityErrorType {
    Invalid = "InvalidTransaction",
    Unknown = "UnknownTransaction"
}
export type TransactionResult = DispatchOutcome | InvalidTransaction | UnknownTransaction;
export interface ITransactionDryRun {
    at: IAt;
    dryRunResult: {
        resultType: TransactionResultType;
        result: TransactionResult;
        validityErrorType?: ValidityErrorType;
    };
}
