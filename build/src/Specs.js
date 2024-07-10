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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Specs = void 0;
const confmgr_1 = require("confmgr");
const sidecar_config_1 = require("./types/sidecar-config");
const APPEND_SPEC_ERROR = 'Must create SpecFactory first.';
/**
 * Access a singleton specification for config enviroment variables that will
 * be initialized on first use.
 */
class Specs {
    static create() {
        this._specs = new confmgr_1.SpecsFactory({ prefix: 'SAS' });
        this.appendLogSpecs();
        this.appendSubstrateSpecs();
        this.appendExpressSpecs();
        return this._specs;
    }
    /**
     * Configurable enviroment variable specifications.
     */
    static get specs() {
        var _a;
        return ((_a = this._specs) === null || _a === void 0 ? void 0 : _a.getSpecs()) || this.create().getSpecs();
    }
    /**
     * EXPRESS module of the enviroment variable configuration specification.
     */
    static appendExpressSpecs() {
        if (!this._specs) {
            throw APPEND_SPEC_ERROR;
        }
        // HOST
        this._specs.appendSpec(sidecar_config_1.MODULES.EXPRESS, this._specs.getSpec(sidecar_config_1.CONFIG.BIND_HOST, 'Network interface we bind to. You *MUST* use 0.0.0.0 if you are using Docker.', {
            default: '127.0.0.1',
            type: 'string',
        }));
        // PORT
        this._specs.appendSpec(sidecar_config_1.MODULES.EXPRESS, this._specs.getSpec(sidecar_config_1.CONFIG.PORT, 'Network interface we bind to. You *MUST* use 0.0.0.0 if you are using Docker.', {
            default: 8080,
            type: 'number',
            regexp: /^\d{2,6}$/,
        }));
        // KEEP_ALIVE_TIMEOUT
        this._specs.appendSpec(sidecar_config_1.MODULES.EXPRESS, this._specs.getSpec(sidecar_config_1.CONFIG.KEEP_ALIVE_TIMEOUT, 'Network keepAliveTimeout duration. It will default to 5000ms.', {
            default: 5000,
            type: 'number',
        }));
    }
    /**
     * SUBSTRATE module of the enviroment variable configuration specification.
     */
    static appendSubstrateSpecs() {
        if (!this._specs) {
            throw APPEND_SPEC_ERROR;
        }
        // WS OR HTTP
        this._specs.appendSpec(sidecar_config_1.MODULES.SUBSTRATE, this._specs.getSpec(sidecar_config_1.CONFIG.URL, 'Websocket or HTTP URL', {
            default: 'ws://127.0.0.1:9944',
            mandatory: true,
            regexp: /^(ws|wss|http|https)?:\/\/.*/,
        }));
        // TYPES_BUNDLE
        this._specs.appendSpec(sidecar_config_1.MODULES.SUBSTRATE, this._specs.getSpec(sidecar_config_1.CONFIG.TYPES_BUNDLE, 'absolute path to file with `typesBundle` type definitions for @polkadot/api', {
            default: '',
            mandatory: false,
        }));
        // TYPES_CHAIN
        this._specs.appendSpec(sidecar_config_1.MODULES.SUBSTRATE, this._specs.getSpec(sidecar_config_1.CONFIG.TYPES_CHAIN, 'absolute path to file with `typesChain` type definitions for @polkadot/api', {
            default: '',
            mandatory: false,
        }));
        // TYPES_SPEC
        this._specs.appendSpec(sidecar_config_1.MODULES.SUBSTRATE, this._specs.getSpec(sidecar_config_1.CONFIG.TYPES_SPEC, 'absolute path to file with `typesSpec` type definitions for @polkadot/api', {
            default: '',
            mandatory: false,
        }));
        this._specs.appendSpec(sidecar_config_1.MODULES.SUBSTRATE, this._specs.getSpec(sidecar_config_1.CONFIG.TYPES, 'absolute path to file with `typesSpec` type definitions for @polkadot/api', {
            default: '',
            mandatory: false,
        }));
    }
    /**
     * LOG module of the enviroment variable configuration specification.
     */
    static appendLogSpecs() {
        if (!this._specs) {
            throw APPEND_SPEC_ERROR;
        }
        // LEVEL
        this._specs.appendSpec(sidecar_config_1.MODULES.LOG, this._specs.getSpec(sidecar_config_1.CONFIG.LEVEL, 'Log level', {
            default: 'info',
            regexp: /^error|warn|info|http|verbose|debug|silly$/,
        }));
        // JSON
        this._specs.appendSpec(sidecar_config_1.MODULES.LOG, this._specs.getSpec(sidecar_config_1.CONFIG.JSON, 'Whether or not to format logs as JSON', {
            default: 'false',
            type: 'boolean',
            regexp: /^true|false$/,
        }));
        // FILTER_RPC
        this._specs.appendSpec(sidecar_config_1.MODULES.LOG, this._specs.getSpec(sidecar_config_1.CONFIG.FILTER_RPC, 'Wether or not filter out API-WS RPC logging', {
            default: 'false',
            type: 'boolean',
            regexp: /^true|false$/,
        }));
        // STRIP_ANSI
        this._specs.appendSpec(sidecar_config_1.MODULES.LOG, this._specs.getSpec(sidecar_config_1.CONFIG.STRIP_ANSI, 'Whether or not to strip ANSI characters', {
            default: 'false',
            type: 'boolean',
            regexp: /^true|false$/,
        }));
        // WRITE
        this._specs.appendSpec(sidecar_config_1.MODULES.LOG, this._specs.getSpec(sidecar_config_1.CONFIG.WRITE, 'Whether or not to write the logs locally', {
            default: 'false',
            type: 'boolean',
            regexp: /^true|false$/,
            mandatory: false,
        }));
        // WRITE_PATH
        this._specs.appendSpec(sidecar_config_1.MODULES.LOG, this._specs.getSpec(sidecar_config_1.CONFIG.WRITE_PATH, 'If WRITE is true, the path to write the logs too.', {
            // TODO: Need <ROOT> of this directory
            default: `${__dirname}/logs`,
            type: 'string',
            mandatory: false,
        }));
        // WRITE_MAX_FILE_SIZE
        this._specs.appendSpec(sidecar_config_1.MODULES.LOG, this._specs.getSpec(sidecar_config_1.CONFIG.WRITE_MAX_FILE_SIZE, 'The max size the log file should not exceed.', {
            default: 5242880,
            type: 'number',
            mandatory: false,
        }));
        // WRITE_MAX_FILES
        this._specs.appendSpec(sidecar_config_1.MODULES.LOG, this._specs.getSpec(sidecar_config_1.CONFIG.WRITE_MAX_FILES, 'The max amount of files that should be created.', {
            default: 5,
            type: 'number',
            mandatory: false,
        }));
    }
}
exports.Specs = Specs;
//# sourceMappingURL=Specs.js.map