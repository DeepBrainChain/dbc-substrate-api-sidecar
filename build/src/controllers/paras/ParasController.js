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
class ParasController extends AbstractController_1.default {
    constructor(api) {
        super(api, '', new services_1.ParasService(api));
        this.getParas = async ({ query: { at } }, res) => {
            this.checkParasModule();
            const hash = await this.getHashFromAt(at);
            ParasController.sanitizedSend(res, await this.service.paras(hash));
        };
        this.getParasHeadIncludedCandidates = async ({ query: { at } }, res) => {
            const hash = await this.getHashFromAt(at);
            ParasController.sanitizedSend(res, await this.service.parasHead(hash, 'CandidateIncluded'));
        };
        this.getParasHeadBackedCandidates = async ({ query: { at } }, res) => {
            const hash = await this.getHashFromAt(at);
            ParasController.sanitizedSend(res, await this.service.parasHead(hash, 'CandidateBacked'));
        };
        this.getCrowdloanInfo = async ({ params: { paraId }, query: { at } }, res) => {
            this.checkParasModule();
            const hash = await this.getHashFromAt(at);
            const paraIdArg = this.parseNumberOrThrow(paraId, 'paraId must be an integer');
            ParasController.sanitizedSend(res, await this.service.crowdloansInfo(hash, paraIdArg));
        };
        this.getCrowdloans = async ({ query: { at } }, res) => {
            this.checkParasModule();
            const hash = await this.getHashFromAt(at);
            ParasController.sanitizedSend(res, await this.service.crowdloans(hash));
        };
        this.getLeaseInfo = async ({ params: { paraId }, query: { at } }, res) => {
            this.checkParasModule();
            const hash = await this.getHashFromAt(at);
            const paraIdArg = this.parseNumberOrThrow(paraId, 'paraId must be an integer');
            ParasController.sanitizedSend(res, await this.service.leaseInfo(hash, paraIdArg));
        };
        this.getLeasesCurrent = async ({ query: { at, currentLeaseHolders } }, res) => {
            this.checkParasModule();
            const hash = await this.getHashFromAt(at);
            const includeCurrentLeaseHolders = currentLeaseHolders !== 'false';
            ParasController.sanitizedSend(res, await this.service.leasesCurrent(hash, includeCurrentLeaseHolders));
        };
        this.getAuctionsCurrent = async ({ query: { at } }, res) => {
            this.checkParasModule();
            const hash = await this.getHashFromAt(at);
            ParasController.sanitizedSend(res, await this.service.auctionsCurrent(hash));
        };
        this.checkParasModule = () => {
            if (!this.api.query.paras) {
                throw new Error('Parachains are not yet supported on this network.');
            }
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.use(this.path + '/paras/leases/current', (0, middleware_1.validateBoolean)(['currentLeaseHolders']));
        this.safeMountAsyncGetHandlers([
            ['/paras', this.getParas],
            ['/paras/crowdloans', this.getCrowdloans],
            ['/paras/:paraId/crowdloan-info', this.getCrowdloanInfo],
            ['/paras/:paraId/lease-info', this.getLeaseInfo],
            ['/paras/leases/current', this.getLeasesCurrent],
            ['/paras/auctions/current', this.getAuctionsCurrent],
            ['/paras/head/included-candidates', this.getParasHeadIncludedCandidates],
            ['/paras/head/backed-candidates', this.getParasHeadBackedCandidates],
            ['/experimental/paras/', this.getParas],
            ['/experimental/paras/crowdloans', this.getCrowdloans],
            ['/experimental/paras/:paraId/crowdloan-info', this.getCrowdloanInfo],
            ['/experimental/paras/:paraId/lease-info', this.getLeaseInfo],
            ['/experimental/paras/leases/current', this.getLeasesCurrent],
            ['/experimental/paras/auctions/current', this.getAuctionsCurrent],
        ]);
    }
}
exports.default = ParasController;
//# sourceMappingURL=ParasController.js.map