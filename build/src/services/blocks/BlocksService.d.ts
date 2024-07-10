import type { ApiPromise } from '@polkadot/api';
import type { ApiDecoration } from '@polkadot/api/types';
import type { BlockHash, Header } from '@polkadot/types/interfaces';
import type { LRUCache } from 'lru-cache';
import { QueryFeeDetailsCache } from '../../chains-config/cache';
import { IBlock, IBlockRaw, IExtrinsicIndex } from '../../types/responses';
import type { IOption } from '../../types/util';
import { AbstractService } from '../AbstractService';
/**
 * Types for fetchBlock's options
 * @field eventDocs
 * @field extrinsicDocs
 * @field checkFinalized Option to reduce rpc calls. Equals true when blockId is a hash.
 * @field queryFinalizedHead Option to reduce rpc calls. Equals true when finalized head has not been queried.
 * @field omitFinalizedTag Option to omit the finalized tag, and return it as undefined.
 */
interface FetchBlockOptions {
    eventDocs: boolean;
    extrinsicDocs: boolean;
    checkFinalized: boolean;
    queryFinalizedHead: boolean;
    omitFinalizedTag: boolean;
    noFees: boolean;
    checkDecodedXcm: boolean;
    paraId?: number;
}
export declare class BlocksService extends AbstractService {
    private minCalcFeeRuntime;
    private blockStore;
    private hasQueryFeeApi;
    constructor(api: ApiPromise, minCalcFeeRuntime: IOption<number>, blockStore: LRUCache<string, IBlock>, hasQueryFeeApi: QueryFeeDetailsCache);
    /**
     * Fetch a block augmented with derived values.
     *
     * @param hash `BlockHash` of the block to fetch.
     * @param FetchBlockOptions options for additonal information.
     */
    fetchBlock(hash: BlockHash, historicApi: ApiDecoration<'promise'>, { eventDocs, extrinsicDocs, checkFinalized, queryFinalizedHead, omitFinalizedTag, noFees, checkDecodedXcm, paraId, }: FetchBlockOptions): Promise<IBlock>;
    private resolveExtFees;
    /**
     * Fetch `payment_queryFeeDetails`.
     *
     * @param ext
     * @param previousBlockHash
     * @param extrinsicSuccessWeight
     * @param estWeight
     */
    private fetchQueryFeeDetails;
    /**
     * Fetch `payment_queryInfo`.
     *
     * @param ext
     * @param previousBlockHash
     */
    private fetchQueryInfo;
    /**
     * Retrieve the blockHash for the previous block to the one getting queried.
     * If the block is the geneisis hash it will return the same blockHash.
     *
     * @param blockNumber The blockId being queried
     */
    private fetchPreviousBlockHash;
    /**
     * Calculate the partialFee for an extrinsic. This uses `calc_partial_fee` from `@substrate/calc`.
     * Please reference the rust code in `@substrate/calc` too see docs on the algorithm.
     *
     * @param extrinsicSuccessWeight
     * @param estWeight
     * @param inclusionFee
     */
    private calcPartialFee;
    /**
     * Return the header of a block
     *
     * @param hash When no hash is inputted the header of the chain will be queried.
     */
    fetchBlockHeader(hash?: BlockHash): Promise<Header>;
    /**
     *
     * @param block Takes in a block which is the result of `BlocksService.fetchBlock`
     * @param extrinsicIndex Parameter passed into the request
     */
    fetchExtrinsicByIndex(block: IBlock, extrinsicIndex: number): IExtrinsicIndex;
    /**
     * Extract extrinsics from a block.
     *
     * @param block Block
     * @param events events fetched by `fetchEvents`
     * @param regsitry The corresponding blocks runtime registry
     * @param extrinsicDocs To include the extrinsic docs or not
     */
    private extractExtrinsics;
    /**
     * Sanitize events and attribute them to an extrinsic, onInitialize, or
     * onFinalize.
     *
     * @param events events from `fetchEvents`
     * @param extrinsics extrinsics from
     * @param hash hash of the block the events are from
     */
    private sanitizeEvents;
    /**
     * Fetch events for the specified block.
     *
     * @param historicApi ApiDecoration to use for the query
     */
    private fetchEvents;
    /**
     * Checks to see if the current chain has the session module, then retrieve all
     * validators.
     *
     * @param historicApi ApiDecoration to use for the query
     */
    private fetchValidators;
    /**
     * Helper function for `parseGenericCall`.
     *
     * @param argsArray array of `Codec` values
     * @param registry type registry of the block the call belongs to
     */
    private parseArrayGenericCalls;
    /**
     * Recursively parse a `GenericCall` in order to label its arguments with
     * their param names and give a human friendly method name (opposed to just a
     * call index). Parses `GenericCall`s that are nested as arguments.
     *
     * @param genericCall `GenericCall`
     * @param registry type registry of the block the call belongs to
     */
    private parseGenericCall;
    /**
     * When querying a block this will immediately inform the request whether
     * or not the queried block is considered finalized at the time of querying.
     *
     * @param api ApiPromise to use for query
     * @param blockNumber Queried block number
     * @param queriedHash Hash of user queried block
     * @param finalizedHead Finalized head for our chain
     * @param checkFinalized If the passed in blockId is a hash
     */
    private isFinalizedBlock;
    /**
     * Fetch a block with raw extrinics values.
     *
     * @param hash `BlockHash` of the block to fetch.
     */
    fetchBlockRaw(hash: BlockHash): Promise<IBlockRaw>;
}
export {};
