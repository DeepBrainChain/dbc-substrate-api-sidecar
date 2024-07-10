import { ContractPromise } from '@polkadot/api-contract';
import { ContractCallOutcome } from '@polkadot/api-contract/types';
import { AbstractService } from '../AbstractService';
export declare class ContractsInkService extends AbstractService {
    /**
     * Query a given message method.
     *
     * @param contract ContractPromise that has decorated querys.
     * @param address Address to query with the contract.
     * @param method Message that will be queried.
     * @param args Args to attach to the query.
     * @param gasLimit Gas limit which will default to -1.
     * @param storageDepositLimit Storage Deposit Limit that will default to null.
     */
    fetchContractCall(contract: ContractPromise, address: string, method: string, args?: unknown[], gasLimit?: string, storageDepositLimit?: string): Promise<ContractCallOutcome>;
}
