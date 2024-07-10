#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Introduced via `@polkadot/api v7.0.1`.
require("@polkadot/api-augment");
const api_1 = require("@polkadot/api");
const rpc_provider_1 = require("@polkadot/rpc-provider");
const express_1 = require("express");
const package_json_1 = __importDefault(require("../package.json"));
const App_1 = __importDefault(require("./App"));
const chains_config_1 = require("./chains-config");
const consoleOverride_1 = require("./logging/consoleOverride");
const Log_1 = require("./logging/Log");
const middleware = __importStar(require("./middleware"));
const typesBundle_1 = __importDefault(require("./override-types/typesBundle"));
const parseArgs_1 = require("./parseArgs");
const SidecarConfig_1 = require("./SidecarConfig");
const metrics_1 = __importDefault(require("./util/metrics"));
async function main() {
    const { config } = SidecarConfig_1.SidecarConfig;
    const { logger } = Log_1.Log;
    // Overide console.{log, error, warn, etc}
    (0, consoleOverride_1.consoleOverride)(logger);
    logger.info(`Version: ${package_json_1.default.version}`);
    const { TYPES_BUNDLE, TYPES_SPEC, TYPES_CHAIN, TYPES } = config.SUBSTRATE;
    // Instantiate a web socket connection to the node and load types
    const api = await api_1.ApiPromise.create({
        provider: config.SUBSTRATE.URL.startsWith('http')
            ? new rpc_provider_1.HttpProvider(config.SUBSTRATE.URL)
            : new rpc_provider_1.WsProvider(config.SUBSTRATE.URL),
        /* eslint-disable @typescript-eslint/no-var-requires */
        typesBundle: TYPES_BUNDLE ? require(TYPES_BUNDLE) : typesBundle_1.default,
        typesChain: TYPES_CHAIN ? require(TYPES_CHAIN) : undefined,
        typesSpec: TYPES_SPEC ? require(TYPES_SPEC) : undefined,
        types: TYPES ? require(TYPES) : undefined,
        /* eslint-enable @typescript-eslint/no-var-requires */
    });
    // Gather some basic details about the node so we can display a nice message
    const [chainName, { implName, specName }] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.state.getRuntimeVersion(),
    ]);
    startUpPrompt(config.SUBSTRATE.URL, chainName.toString(), implName.toString());
    // Create our App
    const app = new App_1.default({
        preMiddleware: [(0, express_1.json)(), middleware.httpLoggerCreate(logger)],
        controllers: (0, chains_config_1.getControllersForSpec)(api, specName.toString()),
        postMiddleware: [
            middleware.txError,
            middleware.httpError,
            middleware.error,
            middleware.legacyError,
            middleware.internalError,
        ],
        port: config.EXPRESS.PORT,
        host: config.EXPRESS.HOST,
    });
    // Start the server
    const server = app.listen();
    server.keepAliveTimeout = config.EXPRESS.KEEP_ALIVE_TIMEOUT;
    server.headersTimeout = config.EXPRESS.KEEP_ALIVE_TIMEOUT + 5000;
    if (args.prometheus) {
        // Create Metrics App
        const metricsApp = new metrics_1.default({
            port: 9100,
            host: config.EXPRESS.HOST,
        });
        // Start the Metrics server
        metricsApp.listen();
    }
}
/**
 * Prompt the user with some basic info about the node and the network they have
 * connected Sidecar to.
 *
 * @param url Url of the node Sidecar is connected to, can be a websocket or http address
 * @param chainName chain name of the network Sidecar is connected to
 * @param implName implementation name of the node Sidecar is connected to
 */
function startUpPrompt(url, chainName, implName) {
    const { logger } = Log_1.Log;
    logger.info(`Connected to chain ${chainName} on the ${implName} client at ${url}`);
    // Split the Url to check for 2 things. Secure connection, and if its a local IP.
    const splitUrl = url.split(':');
    // If its 'ws' its not a secure connection.
    const isSecure = splitUrl[0] === 'wss' || splitUrl[0] === 'https';
    // Check if its a local IP.
    const isLocal = splitUrl[1] === '//127.0.0.1' || splitUrl[1] === '//localhost';
    if (!isSecure && !isLocal) {
        logger.warn(`Using unencrypted connection to a public node (${url}); All traffic is sent over the internet in cleartext.`);
    }
}
process.on('SIGINT', function () {
    console.log('Caught interrupt signal, exiting...');
    process.exit(0);
});
const args = (0, parseArgs_1.parseArgs)();
if (args.version) {
    console.log(`@substrate/api-sidecar v${package_json_1.default.version}`);
    process.exit(0);
}
else {
    main().catch(console.log);
}
//# sourceMappingURL=main.js.map