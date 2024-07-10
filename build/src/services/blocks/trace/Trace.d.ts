import { ApiPromise } from '@polkadot/api';
import { Registry } from '@polkadot/types/types';
import { ActionGroup, BlockTrace, Operation, ParsedAccountEvent, ParsedActionEvent } from './types';
/**
 * Mapping of address => `system::Account` events that belong to the address
 */
type AccountEventsByAddress = Map<string, ParsedAccountEvent[]>;
/**
 * Class for processing traces from the `state_traceBlock` RPC endpoint.
 *
 * Assumptions:
 * - Spans do not start in sorted order.
 * - Events start in sorted order.
 *
 * For a conceptual overview on traces from block excution and `Operation` construction
 * consult [this diagram.](https://docs.google.com/drawings/d/1vZoJo9jaXlz0LmrdTOgHck9_1LsfuQPRmTr-5g1tOis/edit?usp=sharing)
 */
export declare class Trace {
    /**
     * `state_traceBlock` RPC response `result`.
     */
    private traceBlock;
    /**
     * Type registry corresponding to the exact runtime the traces are from.
     */
    private registry;
    /**
     * Known storage keys.
     */
    private keyNames;
    constructor(api: ApiPromise, 
    /**
     * `state_traceBlock` RPC response `result`.
     */
    traceBlock: BlockTrace, 
    /**
     * Type registry corresponding to the exact runtime the traces are from.
     */
    registry: Registry);
    /**
     * Get all the storage key names based on the ones built into `api`.
     *
     * @param api ApiPromise
     */
    private static getKeyNames;
    /**
     * Extract extrinsic indexes from all `:extrinsic_index` storage item read events.
     *
     * Note: Expects the given `spanIds` are from an apply extrinsic action group because
     * apply extrinsic action groups should contain read events to `:extrinsic_index`.
     *
     * @param spanIds List of spanIds for an apply extrinsic action group
     * @param extrinsicIndexBySpanId Map of spanId => extrinsicIndex
     */
    private static extractExtrinsicIndex;
    /**
     * Find the Ids of all the spans which are descendant of the span `root`.
     *
     * @param root span which we want all the descendants of
     * @param spansById map of span id => `SpanWithChildren`
     */
    private static findDescendants;
    /**
     * Parses spans by
     * 1) creating a Map of span's `id` to the the span with its children
     * 2) creating an array with the same spans
     *
     * @param spans spans to parse
     */
    private static parseSpans;
    /**
     * Derive the action groups and operations from the block trace.
     */
    actionsAndOps(): {
        actions: ActionGroup[];
        operations: Operation[];
    };
    /**
     * Extract an extrinsic index from an `:extrinsic_index` event. If it is not an
     * `:extrinsic_index` event returns `null`.
     *
     * @param event a parsed event
     */
    private maybeExtractIndex;
    /**
     * Parse events by
     * 1) Adding parent span info, event index and the storage item name to each event.
     * Also adds the extrinsic index as an integer if there is an `:extrinsic_index` event.
     * 2) Create a map of span id => array of children events
     * 3) Create a map of span id => to extrinisic index
     *
     * @param spansById map of span id => to span with its children for all spans
     * from tracing the block.
     */
    private parseEvents;
    /**
     * Create a mapping address => Account events for that address based on an
     * array of all the events.
     *
     * This mapping is useful because we create operations based on consecutive
     * gets/puts to a single accounts balance data. So later on we can just take all
     * the account events from a single address and create `Operation`s from those.
     *
     * Note: Assumes passed in events are already sorted.
     *
     * @param events events with phase info
     */
    accountEventsByAddress(events: ParsedActionEvent[]): AccountEventsByAddress;
    /**
     * Convert a `ParsedActionEvent` to a `ParsedAccountEvent` by adding the decoded `accountInfo`
     * and `address`.
     *
     * Notes: will throw if event does not have `system` `account` `storagePath`
     *
     * @param event ParsedActionEvent
     */
    private toAccountEvent;
    /**
     * Derive `Operation`s based on consecutive Get/Put events to an addresses `accountInfo`
     * storage item.
     *
     * `Operation`s are created by checking for deltas in each field of `accountInfo` based
     * on the previous event vs the current event.
     *
     * @param accountEventsByAddress map of address => events of that addresses `accountInfo`
     * events.
     */
    private deriveOperations;
    /**
     * Extract the storage item name based on the key prefix.
     *
     * @param key hex encoded storage key
     * @returns KeyInfo
     */
    private getStoragePathFromKey;
}
export {};
