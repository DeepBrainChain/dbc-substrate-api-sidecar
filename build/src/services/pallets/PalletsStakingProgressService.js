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
exports.PalletsStakingProgressService = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const http_errors_1 = require("http-errors");
const AbstractService_1 = require("../AbstractService");
class PalletsStakingProgressService extends AbstractService_1.AbstractService {
    /**
     * Fetch and derive generalized staking information at a given block.
     *
     * @param hash `BlockHash` to make call at
     */
    async derivePalletStakingProgress(hash) {
        var _a;
        const { api } = this;
        const historicApi = await api.at(hash);
        const [validatorCount, forceEra, validators, { number }] = await Promise.all([
            historicApi.query.staking.validatorCount(),
            historicApi.query.staking.forceEra(),
            historicApi.query.session.validators(),
            api.rpc.chain.getHeader(hash),
        ]);
        let eraElectionStatus;
        /**
         * Polkadot runtimes v0.8.30 and above do not support eraElectionStatus, so we check
         * to see if eraElectionStatus is mounted to the api, and if were running on a
         * runtime less than v0.8.30 it will return a successful result. If it doesn't
         * we do nothing and let `eraElectionStatus` stay undefined.
         */
        if (historicApi.query.staking.eraElectionStatus) {
            eraElectionStatus = await historicApi.query.staking.eraElectionStatus();
        }
        const { eraLength, eraProgress, sessionLength, sessionProgress, activeEra } = await this.deriveSessionAndEraProgress(historicApi);
        const unappliedSlashesAtActiveEra = await historicApi.query.staking.unappliedSlashes(activeEra);
        const currentBlockNumber = number.toBn();
        const nextSession = sessionLength.sub(sessionProgress).add(currentBlockNumber);
        const baseResponse = {
            at: {
                hash: hash.toJSON(),
                height: currentBlockNumber.toString(10),
            },
            activeEra: activeEra.toString(10),
            forceEra: forceEra.toJSON(),
            nextSessionEstimate: nextSession.toString(10),
            unappliedSlashes: unappliedSlashesAtActiveEra.map((slash) => slash.toJSON()),
        };
        if (forceEra.isForceNone) {
            // Most likely we are in a PoA network with no elections. Things
            // like `ValidatorCount` and `Validators` are hardcoded from genesis
            // to support a transition into NPoS, but are irrelevant here and would be
            // confusing to include. Thus, we craft a response excluding those values.
            return baseResponse;
        }
        const nextActiveEra = forceEra.isForceAlways
            ? nextSession // there is a new era every session
            : eraLength.sub(eraProgress).add(currentBlockNumber); // the nextActiveEra is at the end of this era
        const electionLookAhead = await this.deriveElectionLookAhead(api, historicApi, hash);
        const nextCurrentEra = nextActiveEra.sub(currentBlockNumber).sub(sessionLength).gt(new bn_js_1.default(0))
            ? nextActiveEra.sub(sessionLength) // current era simply one session before active era
            : nextActiveEra.add(eraLength).sub(sessionLength); // we are in the last session of an active era
        let toggle;
        if (electionLookAhead.eq(new bn_js_1.default(0))) {
            // no offchain solutions accepted
            toggle = null;
        }
        else if (eraElectionStatus === null || eraElectionStatus === void 0 ? void 0 : eraElectionStatus.isClose) {
            // election window is yet to open
            toggle = nextCurrentEra.sub(electionLookAhead);
        }
        else {
            // election window closes at the end of the current era
            toggle = nextCurrentEra;
        }
        return {
            ...baseResponse,
            nextActiveEraEstimate: nextActiveEra.toString(10),
            electionStatus: eraElectionStatus
                ? {
                    status: eraElectionStatus.toJSON(),
                    toggleEstimate: (_a = toggle === null || toggle === void 0 ? void 0 : toggle.toString(10)) !== null && _a !== void 0 ? _a : null,
                }
                : 'Deprecated, see docs',
            idealValidatorCount: validatorCount.toString(10),
            validatorSet: validators.map((accountId) => accountId.toString()),
        };
    }
    /**
     * Derive information on the progress of the current session and era.
     *
     * @param api ApiPromise with ensured metadata
     * @param hash `BlockHash` to make call at
     */
    async deriveSessionAndEraProgress(historicApi) {
        const [currentSlot, epochIndex, genesisSlot, currentIndex, activeEraOption] = await Promise.all([
            historicApi.query.babe.currentSlot(),
            historicApi.query.babe.epochIndex(),
            historicApi.query.babe.genesisSlot(),
            historicApi.query.session.currentIndex(),
            historicApi.query.staking.activeEra(),
        ]);
        if (activeEraOption.isNone) {
            // TODO refactor to newer error type
            throw new http_errors_1.InternalServerError('ActiveEra is None when Some was expected.');
        }
        const { index: activeEra } = activeEraOption.unwrap();
        const activeEraStartSessionIndexOption = await historicApi.query.staking.erasStartSessionIndex(activeEra);
        if (activeEraStartSessionIndexOption.isNone) {
            throw new http_errors_1.InternalServerError('EraStartSessionIndex is None when Some was expected.');
        }
        const activeEraStartSessionIndex = activeEraStartSessionIndexOption.unwrap();
        const { epochDuration: sessionLength } = historicApi.consts.babe;
        const eraLength = historicApi.consts.staking.sessionsPerEra.mul(sessionLength);
        const epochStartSlot = epochIndex.mul(sessionLength).add(genesisSlot);
        const sessionProgress = currentSlot.sub(epochStartSlot);
        const eraProgress = currentIndex.sub(activeEraStartSessionIndex).mul(sessionLength).add(sessionProgress);
        return {
            eraLength,
            eraProgress,
            sessionLength,
            sessionProgress,
            activeEra,
        };
    }
    /**
     * Get electionLookAhead as a const if available. Otherwise derive
     * `electionLookAhead` based on the `specName` & `epochDuration`.
     * N.B. Values are hardcoded based on `specName`s polkadot, kusama, and westend.
     * There are no guarantees that this will return the expected values for
     * other `specName`s.
     *
     * @param api ApiPromise with ensured metadata
     * @param hash `BlockHash` to make call at
     */
    async deriveElectionLookAhead(api, historicApi, hash) {
        if (historicApi.consts.staking.electionLookahead) {
            return historicApi.consts.staking.electionLookahead;
        }
        const { specName } = await api.rpc.state.getRuntimeVersion(hash);
        const { epochDuration } = historicApi.consts.babe;
        // TODO - create a configurable epochDivisor env for a more generic solution
        const epochDurationDivisor = specName.toString() === 'polkadot'
            ? new bn_js_1.default(16) // polkadot electionLookAhead = epochDuration / 16
            : new bn_js_1.default(4); // kusama, westend, `substrate/bin/node` electionLookAhead = epochDuration / 4
        return epochDuration.div(epochDurationDivisor);
    }
}
exports.PalletsStakingProgressService = PalletsStakingProgressService;
//# sourceMappingURL=PalletsStakingProgressService.js.map