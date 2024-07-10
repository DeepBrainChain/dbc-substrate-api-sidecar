import type { LRUCache } from 'lru-cache';
import { QueryFeeDetailsCache } from '../../chains-config/cache';
import { controllers } from '../../controllers';
import { IBlock } from '../../types/responses';
import { IOption } from '../util';
/**
 * Controller mounting configuration as an object where the keys are the
 * controller class names and the values are booleans indicating whether or not
 * to include the controller.
 *
 * There is an additional `finalizes` field that is used to indicate wether or
 * not a chain has finalized blocks. Practically, this only affects if
 * `BlocksController` defaults to getFinalizedHead (in the case it finalizes) or
 *  getHeader (in the case it does not finalize)
 */
export interface ControllerConfig {
    /**
     * Controller class names to be included
     */
    controllers: (keyof typeof controllers)[];
    /**
     * Options relating to how the controllers are configured.
     */
    options: ControllerOptions;
}
export interface ControllerOptions {
    /**
     * Whether or not the chain finalizes blocks
     */
    finalizes?: boolean;
    /**
     * The minimum runtime that supports fee's.
     */
    minCalcFeeRuntime: IOption<number>;
    /**
     * LRU cache that stores the 2 most recent queries.
     */
    blockStore: LRUCache<string, IBlock>;
    /**
     * Cache for storing runtime versions that either have queryFeeDetails, or dont.
     */
    hasQueryFeeApi: QueryFeeDetailsCache;
}
