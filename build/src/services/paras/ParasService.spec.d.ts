import { Option, Tuple, Vec } from '@polkadot/types';
import { BlockNumber } from '@polkadot/types/interfaces';
import { Codec } from '@polkadot/types/types';
export declare const emptyVectorLeases: Vec<import("@polkadot/types").Raw>;
export declare const slotsLeasesAt: () => Promise<Vec<Option<Tuple>>>;
/**
 * Used for parachain Auctions
 */
export declare const auctionsInfoAt: () => Promise<Option<Vec<BlockNumber>>>;
export declare const noneAuctionsInfoAt: () => Promise<Option<Codec>>;
