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
const sanitizeNumbers_1 = require("../../sanitize/sanitizeNumbers");
const registries_1 = require("../../test-helpers/registries");
const mock_1 = require("../test-helpers/mock");
const mockNonimationPoolResponseData_1 = require("../test-helpers/mock/data/mockNonimationPoolResponseData");
const PalletsNominationPoolsService_1 = require("./PalletsNominationPoolsService");
const referendumInfoOfAt = () => Promise.resolve().then(() => {
    registries_1.polkadotRegistry.createType('ReferendumInfo');
});
const mockHistoricApi = {
    registry: registries_1.polkadotRegistry,
    query: {
        democracy: {
            referendumInfoOf: referendumInfoOfAt,
        },
        nominationPools: {
            bondedPools: mockNonimationPoolResponseData_1.getBondedPools,
            rewardPools: mockNonimationPoolResponseData_1.getRewardPools,
            counterForBondedPools: mockNonimationPoolResponseData_1.counterForBondedPools,
            counterForMetadata: mockNonimationPoolResponseData_1.counterForMetadata,
            counterForPoolMembers: mockNonimationPoolResponseData_1.counterForPoolMembers,
            counterForReversePoolIdLookup: mockNonimationPoolResponseData_1.counterForReversePoolIdLookup,
            counterForSubPoolsStorage: mockNonimationPoolResponseData_1.counterForSubPoolsStorage,
            counterForRewardPools: mockNonimationPoolResponseData_1.counterForRewardPools,
            lastPoolId: mockNonimationPoolResponseData_1.lastPoolId,
            maxPoolMembers: mockNonimationPoolResponseData_1.maxPoolMembers,
            maxPoolMembersPerPool: mockNonimationPoolResponseData_1.maxPoolMembersPerPool,
            maxPools: mockNonimationPoolResponseData_1.maxPools,
            minCreateBond: mockNonimationPoolResponseData_1.minCreateBond,
            minJoinBond: mockNonimationPoolResponseData_1.minJoinBond,
        },
    },
};
const mockApi = {
    ...mock_1.defaultMockApi,
    at: (_hash) => mockHistoricApi,
};
const palletsNominationPoolService = new PalletsNominationPoolsService_1.PalletsNominationPoolService(mockApi);
describe('palletsNominationPoolService', () => {
    describe('palletsNominationPoolService.fetchNominationPoolById', () => {
        it('Should return the correct response for a nomination pool without metadata', async () => {
            const expectedResponse = {
                at: {
                    hash: '0x7b713de604a99857f6c25eacc115a4f28d2611a23d9ddff99ab0e4f1c17a8578',
                    height: '789629',
                },
                bondedPool: {
                    points: '2000000000000',
                    state: 'Destroying',
                    memberCounter: '1',
                    roles: {
                        depositor: '15uHYQkvPf3iBQn7mLYbdrf1fYFpE77zVR5hsKGSGYKm5rU9',
                        root: '15LkJX3hcxnHkaTdzq3n3HfKKgRcPJZA7VMNEqtMSfm8xgjR',
                        nominator: '15LkJX3hcxnHkaTdzq3n3HfKKgRcPJZA7VMNEqtMSfm8xgjR',
                        stateToggler: '15LkJX3hcxnHkaTdzq3n3HfKKgRcPJZA7VMNEqtMSfm8xgjR',
                    },
                },
                rewardPool: {
                    lastRecordedRewardCounter: '0',
                    lastRecordedTotalPayouts: '0',
                    totalRewardsClaimed: '0',
                },
            };
            const response = await palletsNominationPoolService.fetchNominationPoolById(122, mock_1.blockHash789629, false);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toStrictEqual(expectedResponse);
        });
        it('Should return the correct response for a nomination pool with metadata', async () => {
            const expectedResponse = {
                at: {
                    hash: '0x64c6d3db75e33e5ef617bc9851078a4c387fcff7ca0eada54e46293d532e3c84',
                    height: '789629',
                },
                bondedPool: {
                    points: '2000000000000',
                    state: 'Destroying',
                    memberCounter: '1',
                    roles: {
                        depositor: '15uHYQkvPf3iBQn7mLYbdrf1fYFpE77zVR5hsKGSGYKm5rU9',
                        root: '15LkJX3hcxnHkaTdzq3n3HfKKgRcPJZA7VMNEqtMSfm8xgjR',
                        nominator: '15LkJX3hcxnHkaTdzq3n3HfKKgRcPJZA7VMNEqtMSfm8xgjR',
                        stateToggler: '15LkJX3hcxnHkaTdzq3n3HfKKgRcPJZA7VMNEqtMSfm8xgjR',
                    },
                },
                rewardPool: {
                    lastRecordedRewardCounter: '0',
                    lastRecordedTotalPayouts: '0',
                    totalRewardsClaimed: '0',
                },
                metadata: '0x4a757374204174652053746f6d61636861636865',
            };
            const blockHashAt = registries_1.polkadotRegistry.createType('BlockHash', '0x64c6d3db75e33e5ef617bc9851078a4c387fcff7ca0eada54e46293d532e3c84');
            const response = await palletsNominationPoolService.fetchNominationPoolById(122, blockHashAt, true);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toStrictEqual(expectedResponse);
        });
    });
    describe('palletsNominationPoolService.fetchNominationPoolInfo', () => {
        it('Should return the correct response for nomination pools info', async () => {
            const expectedResponse = {
                at: {
                    hash: '0x64c6d3db75e33e5ef617bc9851078a4c387fcff7ca0eada54e46293d532e3c84',
                    height: '789629',
                },
                counterForBondedPools: '96',
                counterForMetadata: '93',
                counterForPoolMembers: '228',
                counterForReversePoolIdLookup: '96',
                counterForRewardPools: '96',
                counterForSubPoolsStorage: '39',
                lastPoolId: '122',
                maxPoolMembers: '524288',
                maxPoolMembersPerPool: null,
                maxPools: '512',
                minCreateBond: '1000000000000',
                minJoinBond: '100000000000',
            };
            const blockHashAt = registries_1.polkadotRegistry.createType('BlockHash', '0x64c6d3db75e33e5ef617bc9851078a4c387fcff7ca0eada54e46293d532e3c84');
            const response = await palletsNominationPoolService.fetchNominationPoolInfo(blockHashAt);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(response)).toStrictEqual(expectedResponse);
        });
    });
});
//# sourceMappingURL=PalletsNominationPoolsService.spec.js.map