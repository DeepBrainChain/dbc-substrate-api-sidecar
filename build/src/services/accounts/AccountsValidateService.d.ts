import { IValidateAddrResponse } from '../../types/responses/ValidateAddress';
import { AbstractService } from '../AbstractService';
export declare class AccountsValidateService extends AbstractService {
    /**
     * Takes a given address and determines whether it is a ss58 or
     * a hex (from a u8 array) formatted address,
     * what the ss58 prefix for that address is,
     * what is the network address format,
     * and what the account ID is for this address.
     *
     * @param address ss58 or hex address to validate
     */
    validateAddress(address: string): IValidateAddrResponse;
}
