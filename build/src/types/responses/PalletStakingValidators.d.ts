import { IAt } from './At';
export interface IValidator {
    /**
     * Address of the validator.
     */
    address: string;
    /**
     * The status of the validator which can be either `active` or `waiting`.
     * `Active` means that the validator is part of the active set and
     * `waiting` means that the validator did not get into the active set this era.
     */
    status: string;
}
export interface IPalletStakingValidator {
    at: IAt;
    validators: IValidator[];
    validatorsToBeChilled: IValidator[];
}
