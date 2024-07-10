import { IAccountConvert } from '../../types/responses/AccountConvert';
import { AbstractService } from '../AbstractService';
export declare class AccountsConvertService extends AbstractService {
    /**
     * Takes a given AccountId or Public Key (hex) and converts it to an SS58 address.
     * The conversion is based on the values of the variables scheme, ss58Prefix & publicKey.
     * It also returns the network name.
     *
     * @param accountId or Public Key (hex)
     * @param scheme
     * @param ss58Prefix
     * @param publicKey
     */
    accountConvert(accountId: string, scheme: 'ed25519' | 'sr25519' | 'ecdsa', ss58Prefix: number, publicKey: boolean): IAccountConvert;
}
