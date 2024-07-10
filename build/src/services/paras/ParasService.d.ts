import { BlockHash } from '@polkadot/types/interfaces';
import { IAuctionsCurrent, ICrowdloans, ICrowdloansInfo, ILeaseInfo, ILeasesCurrent, IParas, IParasHeaders } from '../../types/responses';
import { AbstractService } from '../AbstractService';
export declare class ParasService extends AbstractService {
    /**
     * Get crowdloan information for a `paraId`.
     *
     * @param hash `BlockHash` to make call at
     * @param paraId ID of para to get crowdloan info for
     */
    crowdloansInfo(hash: BlockHash, paraId: number): Promise<ICrowdloansInfo>;
    /**
     * List all available crowdloans.
     *
     * @param hash `BlockHash` to make call at
     * @param includeFundInfo wether or not to include `FundInfo` for every crowdloan
     */
    crowdloans(hash: BlockHash): Promise<ICrowdloans>;
    /**
     * Get current and future lease info + lifecycle stage for a given `paraId`.
     *
     * @param hash Get lease info at this `BlockHash`
     * @param paraId ID of para to get lease info of
     */
    leaseInfo(hash: BlockHash, paraId: number): Promise<ILeaseInfo>;
    /**
     * Get the status of the current auction.
     *
     * Note: most fields will be null if there is no ongoing auction.
     *
     * @param hash `BlockHash` to make call at
     */
    auctionsCurrent(hash: BlockHash): Promise<IAuctionsCurrent>;
    /**
     * Get general information about the current lease period.
     *
     * @param hash `BlockHash` to make call at
     * @param includeCurrentLeaseHolders wether or not to include the paraIds of
     * all the curent lease holders. Not including is likely faster and reduces
     * response size.
     */
    leasesCurrent(hash: BlockHash, includeCurrentLeaseHolders: boolean): Promise<ILeasesCurrent>;
    /**
     * List all registered paras (parathreads & parachains).
     *
     * @param hash `BlockHash` to make call at
     * @returns all the current registered paraIds and their lifecycle status
     */
    paras(hash: BlockHash): Promise<IParas>;
    /**
     * Get the heads of the included (backed or considered available) parachain candidates
     * at the specified block height or at the most recent finalized head otherwise.
     *
     * @param hash `BlockHash` to make call at
     */
    parasHead(hash: BlockHash, method: string): Promise<IParasHeaders>;
    /**
     * Calculate the current lease period index.
     * Ref: https://github.com/paritytech/polkadot/pull/3980
     *
     * @param historicApi
     * @param now Current block number
     */
    private leasePeriodIndexAt;
    /**
     * The offset into the ending samples of the auction. When we are not in the
     * ending phase of the auction we can use 0 as the offset, but we do not return
     * that here in order to closely mimic `Auctioneer::is_ending` impl in
     * polkadot's `runtime::common::auctions`.
     *
     * @param now current block number
     * @param beginEnd block number of the start of the auction's ending period
     * @param phase Current phase the auction is in
     * @param historicApi api specific to the queried blocks runtime
     */
    private endingOffset;
    /**
     * Enumerate in order all the lease sets (SlotRange expressed as a set of
     * lease periods) that an `auctions::winning` array covers.
     *
     * Below is an example of function behavior with
     * input:
     * 	`leasePeriodsPerSlot`: 3, `leasePeriodIndexNumber`: 0.
     * output:
     * 	`[[0], [0, 1], [0, 1, 2], [1], [1, 2], [2]]`
     *
     * The third inner loop builds the sub arrays that represent the SlotRange variant.
     * You can think of the outer two loops as creating the start and the end of the range,
     * then the inner most loop iterates through that start and end to build it for us.
     * If we have 3 lease periods per slot (`lPPS`), the outer loop start at 0 and the 2nd
     * inner loop builds increasing ranges starting from 0:
     * `[0], [0, 1], [0, 1, 2]`
     *
     * Once we have built our 0 starting ranges we then increment the outermost loop and
     * start building our 1 starting ranges:
     * `[1], [1, 2]`
     *
     * And finally we increment the outer most loop to 2, building our 2 starting ranges
     * `[2]`
     *
     * Put all those ranges together in the order they where produced and we get:
     * `[[0], [0, 1], [0, 1, 2], [1], [1, 2], [2]]`
     *
     * So now we have an array, where each index corresponds to the same `SlotRange` that
     * would be at that index in the `auctions::winning` array.
     *
     * @param historicApi
     * @param leasePeriodIndex
     */
    private enumerateLeaseSets;
    /**
     * Parachains pallets and modules are not available on all runtimes. This
     * verifies that by checking if the module exists. If it doesnt it will throw an error
     *
     * @param queryFn The QueryModuleStorage key that we want to check exists
     * @param mod Module we are checking
     */
    private assertQueryModule;
}
