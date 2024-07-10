"use strict";
// Copyright 2017-2022 Parity Technologies (UK) Ltd.
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeNumbers = void 0;
const types_1 = require("@polkadot/types");
const types_codec_1 = require("@polkadot/types-codec");
const util_1 = require("@polkadot/util");
const bn_js_1 = __importDefault(require("bn.js"));
const http_errors_1 = require("http-errors");
const polkadot_js_1 = require("../types/polkadot-js");
/**
 * Forcibly serialize all instances of AbstractInt to base 10. With Codec
 * based types we can provide a strong guarantee that the output will be of AnyJson
 *
 * @param value a type that implements polkadot-js Codec
 * @param options - set of options specific to sanitization
 */
function sanitizeCodec(value, options = {}) {
    // If objects have an overlapping prototype chain
    // we check lower down the chain first. More specific before less specific.
    if (value instanceof types_1.Option) {
        return value.isSome ? sanitizeNumbers(value.unwrap(), options) : null;
    }
    if (value instanceof types_1.Compact) {
        return sanitizeNumbers(value.unwrap(), options);
    }
    if (value instanceof types_1.Struct) {
        return value.defKeys.reduce((jsonStruct, key) => {
            const property = value.get(key);
            if (!property) {
                return jsonStruct;
            }
            jsonStruct[key] = sanitizeNumbers(property, options);
            /**
             * If the data we are sanitizing is metadata, ex: `/runtime/metadata`,
             * we want to sanitize all exceptions that arent caught using `sanitizeNumbers`
             */
            if (options === null || options === void 0 ? void 0 : options.metadataOpts) {
                sanitizeMetadataExceptions(key, jsonStruct, property, options.metadataOpts);
            }
            return jsonStruct;
        }, {});
    }
    if (value instanceof types_codec_1.Json) {
        // This is essentially a Map with [keys: strings]: any
        const json = {};
        value.forEach((element, prop) => {
            json[prop] = sanitizeNumbers(element, options);
        });
        return json;
    }
    if (value instanceof types_1.Enum) {
        if (value.isBasic) {
            return value.toJSON();
        }
        return {
            // Replicating camelCaseing introduced in https://github.com/polkadot-js/api/pull/3024
            // Specifically see: https://github.com/polkadot-js/api/blob/516fbd4a90652841d4e81636e74ca472e2dc5621/packages/types/src/codec/Enum.ts#L346
            [(0, util_1.stringCamelCase)(value.type)]: sanitizeNumbers(value.value, options),
        };
    }
    if (value instanceof types_1.BTreeSet) {
        const jsonSet = [];
        value.forEach((element) => {
            jsonSet.push(sanitizeNumbers(element, options));
        });
        return jsonSet;
    }
    if (value instanceof types_1.Set) {
        // CodecSet is essentially just a JS Set<string>
        return value.strings;
    }
    // Should cover BTreeMap and HashMap
    if (value instanceof types_codec_1.CodecMap) {
        return mapTypeSanitizeKeyValue(value);
    }
    // Should cover Vec, VecAny, VecFixed, Tuple
    if (value instanceof types_codec_1.AbstractArray) {
        return value.map((val) => sanitizeNumbers(val, options));
    }
    // Should cover Uint, Int etc...
    if (value instanceof types_codec_1.AbstractInt) {
        return value.toString(10);
    }
    // All other codecs are not nested
    return value.toJSON();
}
/**
 * Forcibly serialize all instances of AbstractInt to base 10 and otherwise
 * normalize data presentation. We try to guarantee that data is
 * of type AnyJson, but it is not a strong guarantee.
 *
 * Under the hood AbstractInt is
 * a BN.js, which has a .toString(radix) that lets us convert to base 10.
 * The likely reason for the inconsistency in polkadot-js natives .toJSON
 * is that over a certain value some Int like types have a flag that tells
 * them to serialize to Hex.
 *
 * @param data - any arbitrary data that Sidecar might send
 * @param options - set of options specific to sanitization
 */
function sanitizeNumbers(data, options = {}) {
    if (data !== 0 && !data) {
        // All falsy values are valid AnyJson, but we want to force numbers to strings
        return data;
    }
    if ((0, polkadot_js_1.isCodec)(data)) {
        return sanitizeCodec(data, options);
    }
    if (data instanceof Set) {
        const jsonSet = [];
        for (const element of data) {
            jsonSet.push(sanitizeNumbers(element, options));
        }
        return jsonSet;
    }
    if (data instanceof Map) {
        return mapTypeSanitizeKeyValue(data, options);
    }
    if (data instanceof bn_js_1.default || typeof data === 'number') {
        return data.toString(10);
    }
    if (Array.isArray(data)) {
        return data.map((val) => sanitizeNumbers(val, options));
    }
    if ((0, polkadot_js_1.isToJSONable)(data)) {
        // Handle non-codec types that have their own toJSON
        return sanitizeNumbers(data.toJSON(), options);
    }
    // Pretty much everything non-primitive is an object, so we need to check this last
    if ((0, util_1.isObject)(data)) {
        return Object.entries(data).reduce((sanitizedObject, [key, value]) => {
            sanitizedObject[key] = sanitizeNumbers(value, options);
            return sanitizedObject;
        }, {});
    }
    if (!(0, polkadot_js_1.isAnyJson)(data)) {
        // TODO this may be removed in the future
        console.error('data could not be forced to `AnyJson` `sanitizeNumber`');
        console.error(data);
    }
    return data;
}
exports.sanitizeNumbers = sanitizeNumbers;
/**
 * Sanitize both the key and values of a map based type, ensuring that the key
 * is either a number or string.
 *
 * @param map Map | CodecMap
 * @param options - set of options specific to sanitization
 */
function mapTypeSanitizeKeyValue(map, options = {}) {
    const jsonMap = {};
    map.forEach((value, key) => {
        let nonCodecKey = sanitizeNumbers(key, options);
        if (typeof nonCodecKey === 'object') {
            nonCodecKey = JSON.stringify(nonCodecKey);
        }
        if (!(typeof nonCodecKey === 'string' || typeof nonCodecKey === 'number')) {
            throw new http_errors_1.InternalServerError('Unexpected non-string and non-number key while sanitizing a Map-like type');
        }
        jsonMap[nonCodecKey] = sanitizeNumbers(value, options);
    });
    return jsonMap;
}
/**
 * Based on the metadata version, we ensure arbitrary exceptions are sanitized
 * properly.
 *
 * @param key Current key of an object
 * @param struct Current struct being sanitized
 * @param property Current value of the inputted key
 * @param metadataOpts metadata specific options
 */
function sanitizeMetadataExceptions(key, struct, property, metadataOpts) {
    switch (metadataOpts.version) {
        case 14:
            sanitizeMetadataExceptionsV14(key, struct, property, metadataOpts);
            break;
        default:
            break;
    }
}
/**
 * When v14 metadata is being sanitized, we ensure arbitrary exceptions are sanitized
 * properly.
 *
 * @param key Current key of an object
 * @param struct Current struct being sanitized
 * @param property Current value of the inputted key
 * @param metadataOpts metadata specific options
 */
function sanitizeMetadataExceptionsV14(key, struct, property, metadataOpts) {
    const { registry } = metadataOpts;
    const integerTypes = ['u128', 'u64', 'u32', 'u16', 'u8'];
    const value = struct[key];
    /**
     * With V14 metadata the only key that is named 'value' lives inside of the
     * pallets key. The expected structure containing `{ type, value }`.
     */
    if (key === 'value' && property instanceof types_codec_1.Bytes && (0, util_1.isHex)(value)) {
        const u8aValue = (0, util_1.hexToU8a)(value);
        /**
         * Get the lookup typedef. It is safe to assume that we have the struct
         * `type` field when `key === value` is true.
         */
        const typeDef = registry.lookup.getTypeDef(parseFloat(struct.type));
        /**
         * Checks u128, u64, u32, u16, u8
         */
        if (integerTypes.includes(typeDef.type)) {
            struct[key] = (0, util_1.u8aToBn)(u8aValue.subarray(0, u8aValue.byteLength), {
                isLe: true,
            }).toString(10);
        }
        /**
         * The value is not an integer, and needs to be converted to its
         * correct type, then transformed to JSON.
         */
        if ((0, util_1.isHex)(struct[key]) && (typeDef.lookupName || typeDef.type)) {
            const typeName = typeDef.lookupName || typeDef.type;
            struct[key] = sanitizeNumbers(registry.createType(typeName, u8aValue).toJSON(), { metadataOpts });
        }
    }
}
//# sourceMappingURL=sanitizeNumbers.js.map