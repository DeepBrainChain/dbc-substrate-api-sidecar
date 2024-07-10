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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@polkadot/util");
const express = __importStar(require("express"));
const http_errors_1 = require("http-errors");
const sanitize_1 = require("../sanitize");
const errors_1 = require("../types/errors");
const verifyInt_1 = require("../util/integers/verifyInt");
/**
 * Abstract base class for creating controller classes.
 */
class AbstractController {
    constructor(api, _path, service) {
        this.api = api;
        this._path = _path;
        this.service = service;
        this._router = express.Router();
    }
    get path() {
        return this._path;
    }
    get router() {
        return this._router;
    }
    /**
     * Safely mount async GET routes by wrapping them with an express
     * handler friendly try / catch block and then mounting on the controllers
     * router.
     *
     * @param pathsAndHandlers array of tuples containing the suffix to the controller
     * base path (use empty string if no suffix) and the get request handler function.
     */
    safeMountAsyncGetHandlers(pathsAndHandlers) {
        for (const pathAndHandler of pathsAndHandlers) {
            const [pathSuffix, handler] = pathAndHandler;
            this.router.get(`${this.path}${pathSuffix}`, _a.catchWrap(handler));
        }
    }
    /**
     * Safely mount async POST routes by wrapping them with an express
     * handler friendly try / catch block and then mounting on the controllers
     * router.
     *
     * @param pathsAndHandlers array of tuples containing the suffix to the controller
     * base path (use empty string if no suffix) and the get request handler function.
     */
    safeMountAsyncPostHandlers(pathsAndHandlers) {
        for (const pathAndHandler of pathsAndHandlers) {
            const [pathSuffix, handler] = pathAndHandler;
            this.router.post(`${this.path}${pathSuffix}`, _a.catchWrap(handler));
        }
    }
    /**
     * Create or retrieve the corresponding BlockHash for the given block identifier.
     * This also acts as a validation for string based block identifiers.
     *
     * @param blockId string representing a hash or number block identifier.
     */
    async getHashForBlock(blockId) {
        let blockNumber;
        // isHex, as imported, returns "value is string", which undersells what it
        // is checking for (it's not only checking that value is string, but that it's
        // valid looking hex). So, we vaguen up the type signature here to avoid breakage
        // below (see https://github.com/polkadot-js/common/issues/1102).
        function isHexBool(value) {
            return (0, util_1.isHex)(value);
        }
        try {
            const isHexStr = isHexBool(blockId);
            if (isHexStr && blockId.length === 66) {
                // This is a block hash
                return this.api.createType('BlockHash', blockId);
            }
            else if (isHexStr) {
                throw new http_errors_1.BadRequest(`Cannot get block hash for ${blockId}. ` + `Hex string block IDs must be 32-bytes (66-characters) in length.`);
            }
            else if (blockId.slice(0, 2) === '0x') {
                throw new http_errors_1.BadRequest(`Cannot get block hash for ${blockId}. ` +
                    `Hex string block IDs must be a valid hex string ` +
                    `and must be 32-bytes (66-characters) in length.`);
            }
            // Not a block hash, must be a block height
            try {
                blockNumber = this.parseNumberOrThrow(blockId, 'Invalid block number');
            }
            catch (err) {
                throw new http_errors_1.BadRequest(`Cannot get block hash for ${blockId}. ` +
                    `Block IDs must be either 32-byte hex strings or non-negative decimal integers.`);
            }
            return await this.api.rpc.chain.getBlockHash(blockNumber);
        }
        catch (err) {
            if (err instanceof http_errors_1.HttpError) {
                // Throw errors we created in the above try block
                throw err;
            }
            const { number } = await this.api.rpc.chain.getHeader().catch(() => {
                throw new http_errors_1.InternalServerError('Failed while trying to get the latest header.');
            });
            if (blockNumber && number.toNumber() < blockNumber) {
                throw new http_errors_1.BadRequest(`Specified block number is larger than the current largest block. ` +
                    `The largest known block number is ${number.toString()}.`);
            }
            // This should never be used, but here just in case
            if ((0, errors_1.isBasicLegacyError)(err)) {
                throw err;
            }
            throw new http_errors_1.InternalServerError(`Cannot get block hash for ${blockId}.`);
        }
    }
    parseNumberOrThrow(n, errorMessage) {
        const num = Number(n);
        if (!(0, verifyInt_1.verifyUInt)(num)) {
            throw new http_errors_1.BadRequest(errorMessage);
        }
        return num;
    }
    /**
     * Expected format ie: 0-999
     */
    parseRangeOfNumbersOrThrow(n, maxRange) {
        const splitRange = n.split('-');
        if (splitRange.length !== 2) {
            throw new http_errors_1.BadRequest('Incorrect range format. Expected example: 0-999');
        }
        const min = Number(splitRange[0]);
        const max = Number(splitRange[1]);
        if (!(0, verifyInt_1.verifyUInt)(min)) {
            throw new http_errors_1.BadRequest('Inputted min value for range must be an unsigned integer.');
        }
        if (!(0, verifyInt_1.verifyNonZeroUInt)(max)) {
            throw new http_errors_1.BadRequest('Inputted max value for range must be an unsigned non zero integer.');
        }
        if (min >= max) {
            throw new http_errors_1.BadRequest('Inputted min value cannot be greater than or equal to the max value.');
        }
        if (max - min > maxRange) {
            throw new http_errors_1.BadRequest(`Inputted range is greater than the ${maxRange} range limit.`);
        }
        return [...Array(max - min + 1).keys()].map((i) => i + min);
    }
    parseQueryParamArrayOrThrow(n) {
        return n.map((str) => this.parseNumberOrThrow(str, `Incorrect AssetId format: ${str} is not a positive integer.`));
    }
    verifyAndCastOr(name, str, or) {
        if (!str) {
            return or;
        }
        if (!(typeof str === 'string')) {
            throw new http_errors_1.BadRequest(`Incorrect argument quantity or type passed in for ${name} query param`);
        }
        return this.parseNumberOrThrow(str, `${name} query param is an invalid number`);
    }
    /**
     * Get a BlockHash based on the `at` query param.
     *
     * @param at should be a block height, hash, or undefined from the `at` query param
     */
    async getHashFromAt(at) {
        return typeof at === 'string' ? await this.getHashForBlock(at) : await this.api.rpc.chain.getFinalizedHead();
    }
    /**
     * Sanitize the numbers within the response body and then send the response
     * body using the original Express Response object.
     *
     * @param res Response
     * @param body response body
     */
    static sanitizedSend(res, body, options = {}) {
        res.send((0, sanitize_1.sanitizeNumbers)(body, options));
    }
}
_a = AbstractController;
/**
 * Wrapper for any asynchronous RequestHandler function. Pipes errors
 * to downstream error handling middleware.
 *
 * @param cb ExpressHandler
 */
AbstractController.catchWrap = (cb) => async (req, res, next) => {
    try {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await cb(req, res, next);
    }
    catch (err) {
        next(err);
    }
};
exports.default = AbstractController;
//# sourceMappingURL=AbstractController.js.map