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
const middleware_1 = require("../../middleware");
const services_1 = require("../../services");
const AbstractController_1 = __importDefault(require("../AbstractController"));
const BlocksController_1 = __importDefault(require("./BlocksController"));
class BlocksTraceController extends AbstractController_1.default {
    constructor(api) {
        super(api, '/experimental/blocks', new services_1.BlocksTraceService(api));
        this.getLatestBlockTraces = async (_req, res) => {
            const hash = await this.api.rpc.chain.getFinalizedHead();
            BlocksController_1.default.sanitizedSend(res, await this.service.traces(hash));
        };
        this.getBlockTraces = async ({ params: { number } }, res) => {
            const hash = await this.getHashForBlock(number);
            BlocksController_1.default.sanitizedSend(res, await this.service.traces(hash));
        };
        this.getLatestBlockOperations = async ({ query: { actions } }, res) => {
            const hash = await this.api.rpc.chain.getFinalizedHead();
            const includeActions = actions === 'true';
            const historicApi = await this.api.at(hash);
            BlocksController_1.default.sanitizedSend(res, await this.service.operations(hash, historicApi, includeActions));
        };
        this.getBlockOperations = async ({ params: { number }, query: { actions } }, res) => {
            const hash = await this.getHashForBlock(number);
            const includeActions = actions === 'true';
            const historicApi = await this.api.at(hash);
            BlocksController_1.default.sanitizedSend(res, await this.service.operations(hash, historicApi, includeActions));
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.use(this.path, (0, middleware_1.validateBoolean)(['actions']));
        this.safeMountAsyncGetHandlers([
            ['/head/traces', this.getLatestBlockTraces],
            ['/:number/traces', this.getBlockTraces],
            ['/:number/traces/operations', this.getBlockOperations],
            ['/head/traces/operations', this.getLatestBlockOperations],
        ]);
    }
}
exports.default = BlocksTraceController;
//# sourceMappingURL=BlocksTraceController.js.map