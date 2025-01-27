import type { ApiPromise } from '@polkadot/api';
import { AccountsStakingPayoutsService } from '../../services';
import AbstractController from '../AbstractController';
/**
 * GET payout information for a stash account.
 *
 * Path params:
 * - `address`: SS58 address of the account. Must be a _Stash_ account.
 *
 * Query params:
 * - (Optional) `depth`: The number of eras to query for payouts of. Must be less
 * 	than `HISTORY_DEPTH`. In cases where `era - (depth -1)` is less
 *	than 0, the first era queried will be 0. Defaults to 1.
 * - (Optional) `era`: The era to query at. Max era payout info is available for
 * 	 is the latest finished era: `active_era - 1`. Defaults to `active_era - 1`.
 * - (Optional) `unclaimedOnly`: Only return unclaimed rewards. Defaults to true.
 *
 * Returns:
 * - `at`:
 * 	- `hash`: The block's hash.
 * 	- `height`: The block's height.
 * - `eraPayouts`: array of
 * 	- `era`: Era this information is associated with.
 * 	- `totalEraRewardPoints`: Total reward points for the era.
 * 	- `totalEraPayout`: Total payout for the era. Validators split the payout
 * 			based on the portion of `totalEraRewardPoints` they have.
 * 	- `payouts`: array of
 * 		- `validatorId`: AccountId of the validator the payout is coming from.
 * 		- `nominatorStakingPayout`: Payout for the reward destination associated with the
 * 			accountId the query was made for.
 * 		- `claimed`: Whether or not the reward has been claimed.
 * 		- `totalValidatorRewardPoints`: Number of reward points earned by the validator.
 * 		- `validatorCommission`: The percentage of the total payout that the validator
 * 				takes as commission, expressed as a Perbill.
 * 		- `totalValidatorExposure`: The sum of the validator's and its nominators' stake.
 * 		- `nominatorExposure`: The amount of stake the nominator has behind the validator.
 *
 * Description:
 * Returns payout information for the last specified eras. If specifying both
 * the depth and era query params, this endpoint will return information for
 * (era - depth) through era. (i.e. if depth=5 and era=20 information will be
 * returned for eras 16 through 20). N.B. You cannot query eras less then
 * `current_era - HISTORY_DEPTH`.
 *
 * N.B. The `nominator*` fields correspond to the address being queried, even if it
 * is a validator's _stash_ address. This is because a validator is technically
 * nominating itself.
 *
 * `payouts` Is an array of payouts for a nominating stash address and information
 * about the validator they were nominating. `eraPayouts` contains an array of
 * objects that has staking reward metadata for each era, and an array of the
 * aformentioned payouts.
 *
 */
export default class AccountsStakingPayoutsController extends AbstractController<AccountsStakingPayoutsService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    /**
     * Get the payouts of `address` for `depth` starting from the `era`.
     *
     * @param req Express Request
     * @param res Express Response
     */
    private getStakingPayoutsByAccountId;
    private getEraAndHash;
}
