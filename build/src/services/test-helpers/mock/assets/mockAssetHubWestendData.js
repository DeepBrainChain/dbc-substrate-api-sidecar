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
exports.poolAssetApprovals = exports.poolAssetsAccount = exports.poolAssetsMetadata = exports.poolAssetsInfoKeysInjected = exports.poolAssetsInfo = void 0;
const assetHubWestendMetadata_1 = require("../../../../test-helpers/metadata/assetHubWestendMetadata");
const registries_1 = require("../../../../test-helpers/registries");
const typeFactory_1 = require("../../../../test-helpers/typeFactory");
const typeFactory_2 = require("../../../../test-helpers/typeFactory");
/**
 * This mock data uses Asset Hub Westend specVersion 1
 */
const assetHubWestendApi = (0, typeFactory_1.createApiWithAugmentations)(assetHubWestendMetadata_1.assetHubWestendMetadataRpcV9435);
const assetHubWestendTypeFactory = new typeFactory_2.TypeFactory(assetHubWestendApi);
const falseBool = registries_1.assetHubWestendRegistryV9435.createType('bool', false);
const trueBool = registries_1.assetHubWestendRegistryV9435.createType('bool', true);
const assetTBalanceOne = registries_1.assetHubWestendRegistryV9435.createType('u64', 147648230602234);
const assetTBalanceTwo = registries_1.assetHubWestendRegistryV9435.createType('u64', 100);
const assetTBalanceThree = registries_1.assetHubWestendRegistryV9435.createType('u64', 200000);
const accountIdTwo = registries_1.assetHubWestendRegistryV9435.createType('AccountId', '5D8Rj3PcZaTDETw2tK67APJVXEubgo7du83kaFXvju3ASToj');
const balanceOfOne = registries_1.assetHubWestendRegistryV9435.createType('BalanceOf', 2000000);
const balanceOfTwo = registries_1.assetHubWestendRegistryV9435.createType('BalanceOf', 48989794);
const assetBalanceObjOne = {
    balance: assetTBalanceOne,
    isFrozen: 'isFrozen does not exist for this runtime',
    sufficient: falseBool,
};
const assetBalanceObjTwo = {
    balance: assetTBalanceTwo,
    isFrozen: 'isFrozen does not exist for this runtime',
    sufficient: falseBool,
};
const assetBalanceObjThree = {
    balance: assetTBalanceThree,
    isFrozen: trueBool,
    sufficient: falseBool,
};
const assetBalanceFactory = {
    '0': assetBalanceObjOne,
    '21': assetBalanceObjTwo,
    '29': assetBalanceObjThree,
};
const assetStorageKeyOne = assetHubWestendTypeFactory.storageKey(0, 'AssetId', assetHubWestendApi.query.assets.asset);
const assetStorageKeyTwo = assetHubWestendTypeFactory.storageKey(21, 'AssetId', assetHubWestendApi.query.assets.asset);
const assetStorageKeyThree = assetHubWestendTypeFactory.storageKey(29, 'AssetId', assetHubWestendApi.query.assets.asset);
const assetsAccountKeysAt = () => Promise.resolve().then(() => {
    return [assetStorageKeyOne, assetStorageKeyTwo, assetStorageKeyThree];
});
const poolAssetsInfo = () => Promise.resolve().then(() => {
    const responseObj = {
        owner: accountIdTwo,
        issuer: accountIdTwo,
        admin: accountIdTwo,
        freezer: accountIdTwo,
        supply: balanceOfTwo,
        deposit: registries_1.assetHubWestendRegistryV9435.createType('u32', 0),
        minBalance: registries_1.assetHubWestendRegistryV9435.createType('u32', 1),
        isSufficient: falseBool,
        accounts: registries_1.assetHubWestendRegistryV9435.createType('u32', 2),
        sufficients: registries_1.assetHubWestendRegistryV9435.createType('u32', 0),
        approvals: registries_1.assetHubWestendRegistryV9435.createType('u32', 0),
        status: 'Live',
    };
    return registries_1.assetHubWestendRegistryV9435.createType('PalletAssetsAssetDetails', responseObj);
});
exports.poolAssetsInfo = poolAssetsInfo;
const poolAssetsInfoKeysInjected = () => {
    // Create a shallow copy of assetsInfo
    const assetInfoCopy = Object.assign({}, exports.poolAssetsInfo);
    // Inject the keys into `assetsInfoCopy`
    Object.assign(assetInfoCopy, {
        keys: assetsAccountKeysAt,
    });
    return assetInfoCopy;
};
exports.poolAssetsInfoKeysInjected = poolAssetsInfoKeysInjected;
const poolAssetsMetadata = () => Promise.resolve().then(() => {
    const responseObj = {
        deposit: registries_1.assetHubWestendRegistryV9435.createType('u8', 0),
        name: registries_1.assetHubWestendRegistryV9435.createType('Bytes', '0x'),
        symbol: registries_1.assetHubWestendRegistryV9435.createType('Bytes', '0x'),
        decimals: registries_1.assetHubWestendRegistryV9435.createType('u8', 0),
        isFrozen: falseBool,
    };
    return registries_1.assetHubWestendRegistryV9435.createType('AssetMetadata', responseObj);
});
exports.poolAssetsMetadata = poolAssetsMetadata;
/**
 * @param assetId options are 0, 21, 29
 */
const poolAssetsAccount = (assetId, _address) => {
    const id = typeof assetId === 'number' ? assetId : parseInt(assetId.toString());
    switch (id) {
        case 0:
            return assetBalanceFactory[0];
        case 21:
            return assetBalanceFactory[21];
        case 29:
            return assetBalanceFactory[29];
        default:
            return;
    }
};
exports.poolAssetsAccount = poolAssetsAccount;
const poolAssetApprovals = () => Promise.resolve().then(() => {
    const assetObj = {
        amount: assetTBalanceOne,
        deposit: balanceOfOne,
    };
    return registries_1.assetHubWestendRegistryV9435.createType('Option<AssetApproval>', assetObj);
});
exports.poolAssetApprovals = poolAssetApprovals;
//# sourceMappingURL=mockAssetHubWestendData.js.map