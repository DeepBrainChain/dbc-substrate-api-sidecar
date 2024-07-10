"use strict";
// Copyright 2017-2023 Parity Technologies (UK) Ltd.
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
exports.minJoinBond = exports.minCreateBond = exports.maxPools = exports.maxPoolMembersPerPool = exports.maxPoolMembers = exports.lastPoolId = exports.counterForRewardPools = exports.counterForSubPoolsStorage = exports.counterForReversePoolIdLookup = exports.counterForPoolMembers = exports.counterForMetadata = exports.counterForBondedPools = exports.getMetadata = exports.getRewardPools = exports.getBondedPools = void 0;
const registries_1 = require("../../../../test-helpers/registries");
const getBondedPools = () => Promise.resolve().then(() => {
    const bondedPool = {
        points: '2000000000000',
        state: 'Destroying',
        memberCounter: '1',
        roles: {
            depositor: '5GxzQ5VrXsnEjsmbohVbVhprovGAXoZrQvMDi2H5iTJEuRN8',
            root: '5GQTABndmBWpK3T83Bzmu8qAU4Rxh1122zct5YtztajcnEmj',
            nominator: '5GQTABndmBWpK3T83Bzmu8qAU4Rxh1122zct5YtztajcnEmj',
            stateToggler: '5GQTABndmBWpK3T83Bzmu8qAU4Rxh1122zct5YtztajcnEmj',
        },
    };
    return registries_1.polkadotRegistryV9300.createType('PalletNominationPoolsBondedPoolInner', bondedPool);
});
exports.getBondedPools = getBondedPools;
const getRewardPools = () => Promise.resolve().then(() => {
    const rewardPool = {
        lastRecordedRewardCounter: '0',
        lastRecordedTotalPayouts: '0',
        totalRewardsClaimed: '0',
    };
    return registries_1.polkadotRegistryV9300.createType('PalletNominationPoolsRewardPool', rewardPool);
});
exports.getRewardPools = getRewardPools;
const getMetadata = () => {
    return '0x4a757374204174652053746f6d61636861636865';
};
exports.getMetadata = getMetadata;
const counterForBondedPools = () => Promise.resolve().then(() => {
    return registries_1.polkadotRegistryV9300.createType('u32', 96);
});
exports.counterForBondedPools = counterForBondedPools;
const counterForMetadata = () => Promise.resolve().then(() => {
    return registries_1.polkadotRegistryV9300.createType('u32', 93);
});
exports.counterForMetadata = counterForMetadata;
const counterForPoolMembers = () => Promise.resolve().then(() => {
    return registries_1.polkadotRegistryV9300.createType('u32', 228);
});
exports.counterForPoolMembers = counterForPoolMembers;
const counterForReversePoolIdLookup = () => Promise.resolve().then(() => {
    return registries_1.polkadotRegistryV9300.createType('u32', 96);
});
exports.counterForReversePoolIdLookup = counterForReversePoolIdLookup;
const counterForSubPoolsStorage = () => Promise.resolve().then(() => {
    return registries_1.polkadotRegistryV9300.createType('u32', 39);
});
exports.counterForSubPoolsStorage = counterForSubPoolsStorage;
const counterForRewardPools = () => Promise.resolve().then(() => {
    return registries_1.polkadotRegistryV9300.createType('u32', 96);
});
exports.counterForRewardPools = counterForRewardPools;
const lastPoolId = () => Promise.resolve().then(() => {
    return registries_1.polkadotRegistryV9300.createType('u32', 122);
});
exports.lastPoolId = lastPoolId;
const maxPoolMembers = () => Promise.resolve().then(() => {
    return registries_1.polkadotRegistryV9300.createType('u32', 524288);
});
exports.maxPoolMembers = maxPoolMembers;
const maxPoolMembersPerPool = () => Promise.resolve().then(() => {
    return registries_1.polkadotRegistryV9300.createType('Option<u32>', null);
});
exports.maxPoolMembersPerPool = maxPoolMembersPerPool;
const maxPools = () => Promise.resolve().then(() => {
    return registries_1.polkadotRegistryV9300.createType('u32', 512);
});
exports.maxPools = maxPools;
const minCreateBond = () => Promise.resolve().then(() => {
    return registries_1.polkadotRegistryV9300.createType('u128', 1000000000000);
});
exports.minCreateBond = minCreateBond;
const minJoinBond = () => Promise.resolve().then(() => {
    return registries_1.polkadotRegistryV9300.createType('u128', 100000000000);
});
exports.minJoinBond = minJoinBond;
//# sourceMappingURL=mockNonimationPoolResponseData.js.map