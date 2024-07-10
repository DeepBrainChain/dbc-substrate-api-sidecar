"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PalletsStakingValidatorsService = void 0;
const AbstractService_1 = require("../AbstractService");
class PalletsStakingValidatorsService extends AbstractService_1.AbstractService {
    /**
     * Fetch all validators addresses and their status at a given block.
     * The status of the validator can be either:
     * - `active` (validator is part of the active set) or
     * - `waiting` (validator did not get into the active set this era)
     *
     * @param hash `BlockHash` to make call at
     */
    async derivePalletStakingValidators(hash) {
        const { api } = this;
        const historicApi = await api.at(hash);
        const [{ number }, validatorSession, validatorsEntries] = await Promise.all([
            api.rpc.chain.getHeader(hash),
            historicApi.query.session.validators(),
            historicApi.query.staking.validators.entries(),
        ]);
        const at = {
            hash,
            height: number.unwrap().toString(10),
        };
        const validatorsActiveSet = new Set();
        for (const address of validatorSession) {
            validatorsActiveSet.add(address.toString());
        }
        // Populating the returned array with the Validator address and its
        // status. If the address is found in the `validatorsActiveSet` then
        // status is `active` otherwise is set to `waiting`
        const validators = [];
        // Active validators that wont be part of the next active validator set
        // for the incoming era.
        const validatorsToBeChilled = [];
        validatorsEntries.map(([key]) => {
            const address = key.args.map((k) => k.toString())[0];
            let status;
            if (validatorsActiveSet.has(address)) {
                status = 'active';
                validatorsActiveSet.delete(address);
            }
            else {
                status = 'waiting';
            }
            validators.push({ address, status });
        });
        if (validatorsActiveSet.size > 0) {
            validatorsActiveSet.forEach((address) => {
                validators.push({ address, status: 'active' });
                validatorsToBeChilled.push({ address, status: 'active' });
            });
        }
        return {
            at,
            validators,
            validatorsToBeChilled,
        };
    }
}
exports.PalletsStakingValidatorsService = PalletsStakingValidatorsService;
//# sourceMappingURL=PalletsStakingValidatorsService.js.map