"use strict";
// Copyright 2017-2023 Parity Technologies (UK) Ltd.
// This file is part of Substrate API Sidecar.
//
// Substrate API Sidecar is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TypeFactory_api, _TypeFactory_registry;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeFactory = exports.createApiWithAugmentations = void 0;
const api_1 = require("@polkadot/api");
const ws_1 = require("@polkadot/rpc-provider/ws");
const types_1 = require("@polkadot/types");
const types_2 = require("@polkadot/types");
jest.mock('@polkadot/rpc-provider/ws'); // WsProvider is now a mock constructor
/**
 * Creates an augmented api with a specific chains metadata. This allows
 * for flexible type creation, which can be useful for testing.
 *
 * @param metadata Metadata to be associated with the api augmentation
 */
function createApiWithAugmentations(metadata) {
    const registry = new types_2.TypeRegistry();
    const expandedMetadata = new types_1.Metadata(registry, metadata);
    const WsProviderMock = ws_1.WsProvider;
    const provider = new WsProviderMock();
    registry.setMetadata(expandedMetadata);
    const api = new api_1.ApiPromise({
        provider,
        registry,
    });
    api.injectMetadata(expandedMetadata, true);
    return api;
}
exports.createApiWithAugmentations = createApiWithAugmentations;
/**
 * Factory for creating polkadot-js `Codec` types. Useful for creating
 * complex types that `createType` cannot accommodate (i.e. creating complex
 * mock data for testing).
 *
 * Ex: <Vec<Option<Tuple<[AccountId, BalanceOf]>>>>
 */
class TypeFactory {
    constructor(api) {
        _TypeFactory_api.set(this, void 0);
        _TypeFactory_registry.set(this, void 0);
        __classPrivateFieldSet(this, _TypeFactory_api, api, "f");
        __classPrivateFieldSet(this, _TypeFactory_registry, __classPrivateFieldGet(this, _TypeFactory_api, "f").registry, "f");
    }
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
    storageKey(index, indexType, storageEntry) {
        const id = __classPrivateFieldGet(this, _TypeFactory_registry, "f").createType(indexType, index);
        const key = new types_2.StorageKey(__classPrivateFieldGet(this, _TypeFactory_registry, "f"), storageEntry.key(id));
        return key.setMeta(storageEntry.creator.meta);
    }
    storageKeyMultilocation(index, indexType, storageEntry) {
        const foreignAssetMultiLocationStr = JSON.stringify(index).replace(/(\d),/g, '$1');
        const id = __classPrivateFieldGet(this, _TypeFactory_registry, "f").createType(indexType, JSON.parse(foreignAssetMultiLocationStr));
        const key = new types_2.StorageKey(__classPrivateFieldGet(this, _TypeFactory_registry, "f"), storageEntry.key(id));
        return key.setMeta(storageEntry.creator.meta);
    }
    optionOf(value) {
        return new types_2.Option(__classPrivateFieldGet(this, _TypeFactory_registry, "f"), value.constructor, value);
    }
    vecOf(items) {
        const vector = new types_2.Vec(__classPrivateFieldGet(this, _TypeFactory_registry, "f"), items[0].constructor);
        vector.push(...items);
        return vector;
    }
    tupleOf(value, types) {
        return new types_2.Tuple(__classPrivateFieldGet(this, _TypeFactory_registry, "f"), types, value);
    }
}
exports.TypeFactory = TypeFactory;
_TypeFactory_api = new WeakMap(), _TypeFactory_registry = new WeakMap();
//# sourceMappingURL=typeFactory.js.map