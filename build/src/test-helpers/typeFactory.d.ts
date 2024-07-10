import { ApiPromise } from '@polkadot/api';
import { StorageEntryBase } from '@polkadot/api/types';
import { Option, StorageKey, Tuple, Vec } from '@polkadot/types';
import { AnyJson, Codec, CodecClass, InterfaceTypes } from '@polkadot/types/types';
import { Observable } from 'rxjs';
/**
 * Type to fulfill StorageEntryBase regarding storage keys
 */
type GenericStorageEntryFunction = (arg1?: unknown, arg2?: unknown) => Observable<Codec>;
/**
 * Creates an augmented api with a specific chains metadata. This allows
 * for flexible type creation, which can be useful for testing.
 *
 * @param metadata Metadata to be associated with the api augmentation
 */
export declare function createApiWithAugmentations(metadata?: `0x${string}` | Uint8Array): ApiPromise;
/**
 * Factory for creating polkadot-js `Codec` types. Useful for creating
 * complex types that `createType` cannot accommodate (i.e. creating complex
 * mock data for testing).
 *
 * Ex: <Vec<Option<Tuple<[AccountId, BalanceOf]>>>>
 */
export declare class TypeFactory {
    #private;
    constructor(api: ApiPromise);
    /**
     * @param index The id to assign the key to.
     * @param indexType The InterfaceType that will be used to create the index into its new appropriate index type
     * @param storageEntry Used primarily on QueryableStorageEntry (ie: api.query) within the polkadot api library.
     * Contains necessary key value pairs to retrieve specific information from a query
     * such as `at`, `entriesAt`, `entries` etc..
     *
     * Some Parameter Examples:
     * 1. apiPromise.query.crowdloans.funds
     * 2. apiPromise.query.slots.leases
     */
    storageKey(index: number | string, indexType: keyof InterfaceTypes, storageEntry: StorageEntryBase<'promise', GenericStorageEntryFunction>): StorageKey;
    storageKeyMultilocation(index: AnyJson, indexType: string, storageEntry: StorageEntryBase<'promise', GenericStorageEntryFunction>): StorageKey;
    optionOf<T extends Codec>(value: T): Option<T>;
    vecOf<T extends Codec>(items: T[]): Vec<T>;
    tupleOf<T extends Codec>(value: T[], types: (CodecClass | keyof InterfaceTypes)[]): Tuple;
}
export {};
