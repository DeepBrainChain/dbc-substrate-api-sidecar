"use strict";
// Copyright 2017-2024 Parity Technologies (UK) Ltd.
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
const services_1 = require("../../services");
const AbstractController_1 = __importDefault(require("../AbstractController"));
/**
 * GET the chain's metadata.
 *
 * Path params:
 * - (Optional) `metadataVersion`: The specific version of the Metadata to query.
 *  The input must conform to the `vX` format, where `X` represents the version number (examples: 'v14', 'v15').
 *
 * Query:
 * - (Optional) `at`: Block hash or height at which to query. If not provided, queries
 *   finalized head.
 *
 * Returns:
 * - Metadata object.
 *
 * Substrate Reference:
 * - FRAME Support: https://crates.parity.io/frame_support/metadata/index.html
 * - Knowledge Base: https://substrate.dev/docs/en/knowledgebase/runtime/metadata
 */
class RuntimeMetadataController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/runtime/metadata', new services_1.RuntimeMetadataService(api));
        /**
         * Get the chain's latest metadata in a decoded, JSON format.
         *
         * @param _req Express Request
         * @param res Express Response
         */
        this.getMetadata = async ({ query: { at } }, res) => {
            const hash = await this.getHashFromAt(at);
            let historicApi;
            if (at) {
                historicApi = await this.api.at(hash);
            }
            const registry = historicApi ? historicApi.registry : this.api.registry;
            const metadata = await this.service.fetchMetadata(hash);
            RuntimeMetadataController.sanitizedSend(res, metadata, {
                metadataOpts: { registry, version: metadata.version },
            });
        };
        /**
         * Get the chain's metadata at a specific version in a decoded, JSON format.
         *
         * @param _req Express Request
         * @param res Express Response
         */
        this.getMetadataVersioned = async ({ params: { metadataVersion }, query: { at } }, res) => {
            const hash = await this.getHashFromAt(at);
            const api = at ? await this.api.at(hash) : this.api;
            // Validation of the `metadataVersion` path parameter.
            const metadataV = metadataVersion.slice(1);
            const version = this.parseNumberOrThrow(metadataV, `Version ${metadataV.toString()} of metadata provided is not a number.`);
            const regExPattern = new RegExp('^[vV][0-9]+$');
            if (!regExPattern.test(metadataVersion)) {
                throw new Error(`${metadataVersion} input is not of the expected 'vX' format, where 'X' represents the version number (examples: 'v14', 'v15').`);
            }
            let availableVersions = [];
            try {
                availableVersions = (await api.call.metadata.metadataVersions()).toJSON();
            }
            catch {
                throw new Error(`Function 'api.call.metadata.metadataVersions()' is not available at this block height.`);
            }
            if (version && !(availableVersions === null || availableVersions === void 0 ? void 0 : availableVersions.includes(version))) {
                throw new Error(`Version ${version} of Metadata is not available.`);
            }
            const registry = api.registry;
            const metadata = await this.service.fetchMetadataVersioned(api, version);
            RuntimeMetadataController.sanitizedSend(res, metadata, {
                metadataOpts: { registry, version },
            });
        };
        /**
         * Get the available versions of chain's metadata.
         *
         * @param _req Express Request
         * @param res Express Response
         */
        this.getMetadataAvailableVersions = async ({ query: { at } }, res) => {
            const hash = await this.getHashFromAt(at);
            const metadataVersions = await this.service.fetchMetadataVersions(hash);
            RuntimeMetadataController.sanitizedSend(res, metadataVersions, {});
        };
        this.initRoutes();
    }
    initRoutes() {
        this.safeMountAsyncGetHandlers([
            ['/', this.getMetadata],
            ['/versions', this.getMetadataAvailableVersions],
            ['/:metadataVersion', this.getMetadataVersioned],
        ]);
    }
}
exports.default = RuntimeMetadataController;
//# sourceMappingURL=RuntimeMetadataController.js.map