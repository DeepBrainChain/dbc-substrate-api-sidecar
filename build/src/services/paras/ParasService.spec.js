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
exports.noneAuctionsInfoAt = exports.auctionsInfoAt = exports.slotsLeasesAt = exports.emptyVectorLeases = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const sanitizeNumbers_1 = require("../../sanitize/sanitizeNumbers");
const rococoMetadata_1 = require("../../test-helpers/metadata/rococoMetadata");
const registries_1 = require("../../test-helpers/registries");
const typeFactory_1 = require("../../test-helpers/typeFactory");
const mock_1 = require("../test-helpers/mock");
const eventsHex_1 = require("../test-helpers/mock/paras/eventsHex");
const parasHeadBackedCandidates_json_1 = __importDefault(require("../test-helpers/responses/paras/parasHeadBackedCandidates.json"));
const parasHeadIncludedCandidates_json_1 = __importDefault(require("../test-helpers/responses/paras/parasHeadIncludedCandidates.json"));
const ParasService_1 = require("./ParasService");
/**
 * ParasService specific constants
 * The below types and constants use the rococo registry in order to properly
 * test the ParasService with accurate metadata
 */
const rococoApi = (0, typeFactory_1.createApiWithAugmentations)(rococoMetadata_1.rococoMetadataV228);
const rococoTypeFactory = new typeFactory_1.TypeFactory(rococoApi);
/**
 * Used for parachain crowdloans
 */
const funds = {
    depositor: registries_1.rococoRegistry.createType('AccountId', '14E5nqKAp3oAJcmzgZhUD2RcptBeUBScxKHgJKU4HPNcKVf3'),
    verifier: null,
    deposit: registries_1.rococoRegistry.createType('Balance', 100000000000000),
    raised: registries_1.rococoRegistry.createType('Balance', 627500000000000),
    end: registries_1.rococoRegistry.createType('BlockNumber', 200000),
    cap: registries_1.rococoRegistry.createType('Balance', '0x0000000000000000016345785d8a0000'),
    lastContribution: registries_1.rococoRegistry.createType('LastContribution', {
        preEnding: 6,
    }),
    firstPeriod: registries_1.rococoRegistry.createType('LeasePeriod', 13),
    lastPeriod: registries_1.rococoRegistry.createType('LeasePeriod', 16),
    trieIndex: registries_1.rococoRegistry.createType('TrieIndex', 60),
};
const paraLifecycleObjectOne = {
    onboarding: true,
    parachain: true,
};
const paraLifecycleObjectTwo = {
    parathread: true,
    parachain: false,
};
const crowdloanParaId1 = rococoTypeFactory.storageKey(199, 'ParaId', rococoApi.query.crowdloan.funds);
const crowdloanParaId2 = rococoTypeFactory.storageKey(200, 'ParaId', rococoApi.query.crowdloan.funds);
const paraLifecycleOne = registries_1.rococoRegistry.createType('ParaLifecycle', paraLifecycleObjectOne);
const paraLifecycleTwo = registries_1.rococoRegistry.createType('ParaLifecycle', paraLifecycleObjectTwo);
const accountIdOne = registries_1.rococoRegistry.createType('AccountId', '1TYrFCWxwHA5bhiXf6uLvPfG6eEvrzzL7uiPK3Yc6yHLUqc');
const accountIdTwo = registries_1.rococoRegistry.createType('AccountId', '13NXiLYYzVEjXxU3eaZNcrjEX9vPyVDNNpURCzK8Bj9BiCWH');
const balanceOfOne = registries_1.rococoRegistry.createType('BalanceOf', 1000000);
const balanceOfTwo = registries_1.rococoRegistry.createType('BalanceOf', 2000000);
const fundsEntries = () => Promise.resolve().then(() => {
    const optionFundInfo = registries_1.rococoRegistry.createType('Option<FundInfo>', funds);
    const entries = [
        [crowdloanParaId1, optionFundInfo],
        [crowdloanParaId2, optionFundInfo],
    ];
    return entries;
});
const fundsAt = () => Promise.resolve().then(() => {
    return registries_1.rococoRegistry.createType('Option<FundInfo>', funds);
});
const fundsKeys = () => Promise.resolve().then(() => {
    return [crowdloanParaId1, crowdloanParaId2];
});
/**
 * Used for parachain paras
 */
const paraLifeCycleParaId1 = rococoTypeFactory.storageKey(199, 'ParaId', rococoApi.query.paras.paraLifecycles);
const paraLifeCycleParaId2 = rococoTypeFactory.storageKey(200, 'ParaId', rococoApi.query.paras.paraLifecycles);
const parasLifecyclesEntriesAt = () => Promise.resolve().then(() => {
    return [
        [paraLifeCycleParaId1, paraLifecycleOne],
        [paraLifeCycleParaId2, paraLifecycleTwo],
    ];
});
const parasGenesisArgsAt = () => Promise.resolve().then(() => {
    return registries_1.rococoRegistry.createType('ParaGenesisArgs', { parachain: true });
});
const upcomingParasGenesisAt = () => Promise.resolve().then(() => {
    return registries_1.rococoRegistry.createType('Option<ParaGenesisArgs>', {
        parachain: true,
    });
});
const parasLifecyclesAt = () => Promise.resolve().then(() => {
    return rococoTypeFactory.optionOf(paraLifecycleOne);
});
/**
 * Used for parachain leases
 */
const leasesParaId1 = rococoTypeFactory.storageKey(199, 'ParaId', rococoApi.query.slots.leases);
const leasesParaId2 = rococoTypeFactory.storageKey(200, 'ParaId', rococoApi.query.slots.leases);
const leasesTupleOne = rococoTypeFactory.tupleOf([accountIdOne, balanceOfOne], ['AccountId', 'BalanceOf']);
const leasesTupleTwo = rococoTypeFactory.tupleOf([accountIdTwo, balanceOfTwo], ['AccountId', 'BalanceOf']);
const parasOptionsOne = rococoTypeFactory.optionOf(leasesTupleOne);
const parasOptionsTwo = rococoTypeFactory.optionOf(leasesTupleTwo);
const vectorLeases = rococoTypeFactory.vecOf([parasOptionsOne, parasOptionsTwo]);
exports.emptyVectorLeases = registries_1.rococoRegistry.createType('Vec<Raw>', []);
const slotsLeasesAt = () => Promise.resolve().then(() => {
    return vectorLeases;
});
exports.slotsLeasesAt = slotsLeasesAt;
const slotsLeasesEntriesAt = () => Promise.resolve().then(() => {
    return [
        [leasesParaId1, vectorLeases],
        [leasesParaId2, vectorLeases],
    ];
});
/**
 * Used for parachain Auctions
 */
const auctionsInfoAt = () => Promise.resolve().then(() => {
    const beginEnd = registries_1.rococoRegistry.createType('BlockNumber', 780000);
    const leasePeriodIndex = registries_1.rococoRegistry.createType('BlockNumber', 39);
    const vectorAuctions = rococoTypeFactory.vecOf([leasePeriodIndex, beginEnd]);
    const optionAuctions = rococoTypeFactory.optionOf(vectorAuctions);
    return optionAuctions;
});
exports.auctionsInfoAt = auctionsInfoAt;
const noneAuctionsInfoAt = () => Promise.resolve().then(() => registries_1.rococoRegistry.createType('Option<Raw>', null));
exports.noneAuctionsInfoAt = noneAuctionsInfoAt;
const auctionCounterAt = () => Promise.resolve().then(() => {
    const counter = new bn_js_1.default(4);
    return counter;
});
const auctionsWinningsAt = () => Promise.resolve().then(() => {
    const paraId1 = registries_1.rococoRegistry.createType('ParaId', 199);
    const paraId2 = registries_1.rococoRegistry.createType('ParaId', 200);
    const tupleOne = rococoTypeFactory.tupleOf([accountIdOne, paraId1, balanceOfOne], ['AccountId', 'ParaId', 'BalanceOf']);
    const tupleTwo = rococoTypeFactory.tupleOf([accountIdTwo, paraId2, balanceOfTwo], ['AccountId', 'ParaId', 'BalanceOf']);
    const parasOptionsOne = rococoTypeFactory.optionOf(tupleOne);
    const parasOptionsTwo = rococoTypeFactory.optionOf(tupleTwo);
    // No bids for the remaining slot ranges
    const mockWinningOptions = new Array(8).fill(registries_1.rococoRegistry.createType('Option<Raw>', null));
    // Total of 10 winning object, 2 `Some(..)`, 8 `None`
    const vectorWinnings = rococoTypeFactory.vecOf([parasOptionsOne, parasOptionsTwo, ...mockWinningOptions]);
    const optionWinnings = rococoTypeFactory.optionOf(vectorWinnings);
    return optionWinnings;
});
/**
 * Used for parachain ParasHeads
 */
const eventsAt = () => Promise.resolve().then(() => registries_1.polkadotRegistryV9300.createType('Vec<FrameSystemEventRecord>', eventsHex_1.eventsHex));
const historicApi = {
    consts: {
        auctions: {
            endingPeriod: new bn_js_1.default(20000),
            sampleLength: new bn_js_1.default(2),
            leasePeriodsPerSlot: undefined,
        },
        slots: {
            leasePeriod: new bn_js_1.default(20000),
        },
    },
    query: {
        auctions: {
            auctionInfo: exports.auctionsInfoAt,
            auctionCounter: auctionCounterAt,
            winning: auctionsWinningsAt,
        },
        crowdloan: {
            funds: fundsAt,
        },
        paras: {
            paraLifecycles: parasLifecyclesAt,
            paraGenesisArgs: parasGenesisArgsAt,
            upcomingParasGenesis: upcomingParasGenesisAt,
        },
        slots: {
            leases: exports.slotsLeasesAt,
        },
        system: {
            events: eventsAt,
        },
    },
};
/**
 * Assign necessary keys to crowdloan.funds
 */
Object.assign(historicApi.query.crowdloan.funds, {
    entries: fundsEntries,
    keys: fundsKeys,
});
/**
 * Assign necessary keys to paras.paraLifecycles
 */
Object.assign(historicApi.query.paras.paraLifecycles, {
    entries: parasLifecyclesEntriesAt,
});
/**
 * Assign necessary keys to slots.leases
 */
Object.assign(historicApi.query.slots.leases, {
    entries: slotsLeasesEntriesAt,
});
const mockApi = {
    ...mock_1.defaultMockApi,
    at: (_hash) => historicApi,
};
const parasService = new ParasService_1.ParasService(mockApi);
describe('ParasService', () => {
    const paraId = 199;
    const expectedAt = {
        hash: '0x7b713de604a99857f6c25eacc115a4f28d2611a23d9ddff99ab0e4f1c17a8578',
        height: '789629',
    };
    const expectedFund = {
        depositor: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
        verifier: null,
        deposit: '100000000000000',
        raised: '627500000000000',
        end: '200000',
        cap: '100000000000000000',
        lastContribution: { preEnding: '6' },
        firstPeriod: '13',
        lastPeriod: '16',
        trieIndex: '60',
    };
    describe('ParasService.crowdloansInfo', () => {
        it('Should return correct crowdloans info for a queried `paraId`', async () => {
            const expectedResponse = {
                at: expectedAt,
                fundInfo: expectedFund,
                leasePeriods: ['13', '14', '15', '16'],
            };
            const response = await parasService.crowdloansInfo(mock_1.blockHash789629, paraId);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toMatchObject(expectedResponse);
        });
    });
    describe('ParasService.crowdloans', () => {
        it('Should return correct crowdloans response', async () => {
            const expectedResponse = {
                at: expectedAt,
                funds: [
                    {
                        fundInfo: expectedFund,
                        paraId: '199',
                    },
                    {
                        fundInfo: expectedFund,
                        paraId: '200',
                    },
                ],
            };
            const response = await parasService.crowdloans(mock_1.blockHash789629);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toMatchObject(expectedResponse);
        });
    });
    describe('ParasService.leaseInfo', () => {
        it('Should return the correct leasing information for a queried `paraId`', async () => {
            const expectedResponse = {
                at: expectedAt,
                leases: [
                    {
                        account: '5CXFhuwT7A1ge4hCa23uCmZWQUebEZSrFdBEE24C41wmAF4N',
                        deposit: '1000000',
                    },
                    {
                        account: '5ESEa1HV8hyG6RTXgwWNUhu5fXvkHBfEJKjw3hKmde7fXdHQ',
                        deposit: '2000000',
                    },
                ],
                paraLifecycle: 'Onboarding',
                onboardingAs: 'parachain',
            };
            const response = await parasService.leaseInfo(mock_1.blockHash789629, paraId);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toMatchObject(expectedResponse);
        });
        it('Should have `null` `leases` when its length is equal to 0', async () => {
            const emptyLeasesAt = () => Promise.resolve().then(() => exports.emptyVectorLeases);
            historicApi.query.slots.leases = emptyLeasesAt;
            const expectedResponse = {
                at: expectedAt,
                leases: null,
                paraLifecycle: 'Onboarding',
                onboardingAs: 'parachain',
            };
            const response = await parasService.leaseInfo(mock_1.blockHash789629, paraId);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toMatchObject(expectedResponse);
            historicApi.query.slots.leases = exports.slotsLeasesAt;
        });
    });
    describe('ParasService.leasesCurrent', () => {
        it('Should return the correct entries for `leasesCurrent`', async () => {
            const expectedResponse = {
                at: expectedAt,
                leasePeriodIndex: '39',
                endOfLeasePeriod: '800000',
                currentLeaseHolders: ['199', '200'],
            };
            const response = await parasService.leasesCurrent(mock_1.blockHash789629, true);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toMatchObject(expectedResponse);
        });
        it('Should return the correct response excluding `currentLeaseHolders`', async () => {
            const expectedResponse = {
                at: expectedAt,
                leasePeriodIndex: '39',
                endOfLeasePeriod: '800000',
                currentLeaseHolders: undefined,
            };
            const response = await parasService.leasesCurrent(mock_1.blockHash789629, false);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toMatchObject(expectedResponse);
        });
    });
    describe('ParasService.paras', () => {
        it('Should return correct ParaLifecycles response', async () => {
            const expectedResponse = {
                at: expectedAt,
                paras: [
                    {
                        paraId: '199',
                        paraLifecycle: 'Onboarding',
                        onboardingAs: 'parachain',
                    },
                    {
                        paraId: '200',
                        paraLifecycle: 'Parathread',
                    },
                ],
            };
            const response = await parasService.paras(mock_1.blockHash789629);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toMatchObject(expectedResponse);
        });
    });
    describe('ParasService.auctionsCurrent', () => {
        /**
         * Helper function to generate a a header to use to override the current one.
         * This allows us to change the expected block we are using here as our head
         * to test for a specific `phase` in an auction.
         *
         * @param blockNumber Current block head returned by header
         * @returns
         */
        const generateOverrideHeader = (blockNumber) => {
            return {
                parentHash: '0x205da5dba43bbecae52b44912249480aa9f751630872b6b6ba1a9d2aeabf0177',
                number: blockNumber,
                stateRoot: '0x023b5bb1bc10a1a91a9ef683f46a8bb09666c50476d5592bd6575a73777eb173',
                extrinsicsRoot: '0x4c1d65bf6b57086f00d5df40aa0686ffbc581ef60878645613b1fc3303de5030',
                digest: {},
            };
        };
        it('Should return the correct data during an ongoing endPeriod phase', async () => {
            const leasePeriodIndex = new bn_js_1.default(39);
            const leaseIndexArray = parasService['enumerateLeaseSets'](historicApi, leasePeriodIndex);
            // Remove the first two entries with splice because we have them in the expectedResponse.
            // `LEASE_PERIODS_PER_SLOT_FALLBACK` is 4 we need 10 slots for winning.
            const additionalWinningOptions = leaseIndexArray.splice(2, leaseIndexArray.length - 2).map((k) => {
                return { bid: null, leaseSet: (0, sanitizeNumbers_1.sanitizeNumbers)(k) };
            });
            const expectedResponse = {
                at: expectedAt,
                beginEnd: '780000',
                finishEnd: '800000',
                phase: 'endPeriod',
                auctionIndex: '4',
                leasePeriods: ['39', '40', '41', '42'],
                winning: [
                    {
                        bid: {
                            accountId: '5CXFhuwT7A1ge4hCa23uCmZWQUebEZSrFdBEE24C41wmAF4N',
                            amount: '1000000',
                            paraId: '199',
                        },
                        leaseSet: ['39'],
                    },
                    {
                        bid: {
                            accountId: '5ESEa1HV8hyG6RTXgwWNUhu5fXvkHBfEJKjw3hKmde7fXdHQ',
                            amount: '2000000',
                            paraId: '200',
                        },
                        leaseSet: ['39', '40'],
                    },
                    ...additionalWinningOptions,
                ],
            };
            const response = await parasService.auctionsCurrent(mock_1.blockHash789629);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toMatchObject(expectedResponse);
        });
        it('Should return the correct data during a startPeriod phase', async () => {
            const overrideHeader = generateOverrideHeader(770000);
            const header = registries_1.polkadotRegistry.createType('Header', overrideHeader);
            // Override the mockApi
            mockApi.rpc.chain.getHeader = () => Promise.resolve().then(() => header);
            const expectedResponse = {
                at: {
                    hash: '0x7b713de604a99857f6c25eacc115a4f28d2611a23d9ddff99ab0e4f1c17a8578',
                    height: '770000',
                },
                beginEnd: '780000',
                finishEnd: '800000',
                phase: 'startPeriod',
                auctionIndex: '4',
                leasePeriods: ['39', '40', '41', '42'],
                winning: null,
            };
            const response = await parasService.auctionsCurrent(mock_1.blockHash789629);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toStrictEqual(expectedResponse);
            // Set the MockApi back to its original self
            mockApi.rpc.chain.getHeader = () => Promise.resolve().then(() => mock_1.mockBlock789629.header);
        });
        it('Should return the correct data during a vrfDelay phase', async () => {
            const overrideHeader = generateOverrideHeader(800000);
            const header = registries_1.polkadotRegistry.createType('Header', overrideHeader);
            // Override the mockApi
            mockApi.rpc.chain.getHeader = () => Promise.resolve().then(() => header);
            const expectedResponse = {
                at: {
                    hash: '0x7b713de604a99857f6c25eacc115a4f28d2611a23d9ddff99ab0e4f1c17a8578',
                    height: '800000',
                },
                beginEnd: '780000',
                finishEnd: '800000',
                phase: 'vrfDelay',
                auctionIndex: '4',
                leasePeriods: ['39', '40', '41', '42'],
                winning: null,
            };
            const response = await parasService.auctionsCurrent(mock_1.blockHash789629);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toStrictEqual(expectedResponse);
            // Set the MockApi back to its original self
            mockApi.rpc.chain.getHeader = () => Promise.resolve().then(() => mock_1.mockBlock789629.header);
        });
        it('Should return the correct null values when `auctionInfo` is `None`', async () => {
            historicApi.query.auctions.auctionInfo = exports.noneAuctionsInfoAt;
            const expectedResponse = {
                at: expectedAt,
                beginEnd: null,
                finishEnd: null,
                phase: null,
                auctionIndex: '4',
                leasePeriods: null,
                winning: null,
            };
            const response = await parasService.auctionsCurrent(mock_1.blockHash789629);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toMatchObject(expectedResponse);
            historicApi.query.auctions.auctionInfo = exports.auctionsInfoAt;
        });
    });
    describe('ParasService.parasHead', () => {
        it('Should return the correct response for CandidateIncluded methods', async () => {
            const response = await parasService.parasHead(mock_1.blockHash789629, 'CandidateIncluded');
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toStrictEqual(parasHeadIncludedCandidates_json_1.default);
        });
        it('Should return the correct response for CandidateBacked methods', async () => {
            const response = await parasService.parasHead(mock_1.blockHash789629, 'CandidateBacked');
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toStrictEqual(parasHeadBackedCandidates_json_1.default);
        });
    });
});
//# sourceMappingURL=ParasService.spec.js.map