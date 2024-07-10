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
exports.assetApprovals = exports.assetsAccount = exports.assetsMetadata = exports.assetsInfoKeysInjected = exports.assetsInfo = void 0;
const assetHubPolkadotMetadata_1 = require("../../../../test-helpers/metadata/assetHubPolkadotMetadata");
const registries_1 = require("../../../../test-helpers/registries");
const typeFactory_1 = require("../../../../test-helpers/typeFactory");
const typeFactory_2 = require("../../../../test-helpers/typeFactory");
/**
 * This mock data uses Asset Hub Polkadot specVersion 1
 */
const assetHubPolkadotApiV1 = (0, typeFactory_1.createApiWithAugmentations)(assetHubPolkadotMetadata_1.assetHubPolkadotV1);
const assetHubPolkadotTypeFactory = new typeFactory_2.TypeFactory(assetHubPolkadotApiV1);
const falseBool = registries_1.assetHubKusamaRegistryV9430.createType('bool', false);
const trueBool = registries_1.assetHubKusamaRegistryV9430.createType('bool', true);
const assetTBalanceOne = registries_1.assetHubKusamaRegistryV9430.createType('u64', 10000000);
const assetTBalanceTwo = registries_1.assetHubKusamaRegistryV9430.createType('u64', 20000000);
const accountIdOne = registries_1.assetHubKusamaRegistryV9430.createType('AccountId', '1TYrFCWxwHA5bhiXf6uLvPfG6eEvrzzL7uiPK3Yc6yHLUqc');
const accountIdTwo = registries_1.assetHubKusamaRegistryV9430.createType('AccountId', '13NXiLYYzVEjXxU3eaZNcrjEX9vPyVDNNpURCzK8Bj9BiCWH');
const balanceOfTwo = registries_1.assetHubKusamaRegistryV9430.createType('BalanceOf', 2000000);
const assetBalanceObjOne = {
    balance: assetTBalanceOne,
    isFrozen: falseBool,
    sufficient: trueBool,
};
const assetBalanceObjTwo = {
    balance: assetTBalanceTwo,
    isFrozen: trueBool,
    sufficient: trueBool,
};
const assetBalanceObjThree = {
    balance: assetTBalanceTwo,
    isFrozen: falseBool,
    sufficient: falseBool,
};
const assetBalanceFactory = {
    '10': assetBalanceObjOne,
    '20': assetBalanceObjTwo,
    '30': assetBalanceObjThree,
};
const assetStorageKeyOne = assetHubPolkadotTypeFactory.storageKey(10, 'AssetId', assetHubPolkadotApiV1.query.assets.asset);
const assetStorageKeyTwo = assetHubPolkadotTypeFactory.storageKey(20, 'AssetId', assetHubPolkadotApiV1.query.assets.asset);
const assetStorageKeyThree = assetHubPolkadotTypeFactory.storageKey(30, 'AssetId', assetHubPolkadotApiV1.query.assets.asset);
const assetsAccountKeysAt = () => Promise.resolve().then(() => {
    return [assetStorageKeyOne, assetStorageKeyTwo, assetStorageKeyThree];
});
const assetsInfo = () => Promise.resolve().then(() => {
    const responseObj = {
        owner: accountIdOne,
        issue: accountIdTwo,
        admin: accountIdTwo,
        freezer: accountIdTwo,
        supply: assetTBalanceOne,
        deposit: balanceOfTwo,
        minBalance: registries_1.assetHubKusamaRegistryV9430.createType('u64', 10000),
        isSufficient: trueBool,
        accounts: registries_1.assetHubKusamaRegistryV9430.createType('u32', 10),
        sufficients: registries_1.assetHubKusamaRegistryV9430.createType('u32', 15),
        approvals: registries_1.assetHubKusamaRegistryV9430.createType('u32', 20),
        isFrozen: falseBool,
    };
    return registries_1.assetHubKusamaRegistryV9430.createType('PalletAssetsAssetDetails', responseObj);
});
exports.assetsInfo = assetsInfo;
const assetsInfoKeysInjected = () => {
    // Create a shallow copy of assetsInfo
    const assetInfoCopy = Object.assign({}, exports.assetsInfo);
    // Inject the keys into `assetsInfoCopy`
    Object.assign(assetInfoCopy, {
        keys: assetsAccountKeysAt,
    });
    return assetInfoCopy;
};
exports.assetsInfoKeysInjected = assetsInfoKeysInjected;
const assetsMetadata = () => Promise.resolve().then(() => {
    const responseObj = {
        deposit: balanceOfTwo,
        name: registries_1.assetHubKusamaRegistryV9430.createType('Bytes', 'statemint'),
        symbol: registries_1.assetHubKusamaRegistryV9430.createType('Bytes', 'DOT'),
        decimals: registries_1.assetHubKusamaRegistryV9430.createType('u8', 10),
        isFrozen: falseBool,
    };
    return registries_1.assetHubKusamaRegistryV9430.createType('AssetMetadata', responseObj);
});
exports.assetsMetadata = assetsMetadata;
/**
 * @param assetId options are 10, 20, 30
 */
const assetsAccount = (assetId, _address) => {
    const id = typeof assetId === 'number' ? assetId : parseInt(assetId.toString());
    switch (id) {
        case 10:
            return assetBalanceFactory[10];
        case 20:
            return assetBalanceFactory[20];
        case 30:
            return assetBalanceFactory[30];
        default:
            return;
    }
};
exports.assetsAccount = assetsAccount;
const assetApprovals = () => Promise.resolve().then(() => {
    const assetObj = {
        amount: assetTBalanceOne,
        deposit: balanceOfTwo,
    };
    return registries_1.assetHubKusamaRegistryV9430.createType('Option<AssetApproval>', assetObj);
});
exports.assetApprovals = assetApprovals;
//# sourceMappingURL=mockAssetData.js.map