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
exports.foreignAssetsEntries = void 0;
const assetHubKusamaMetadata_1 = require("../../../../test-helpers/metadata/assetHubKusamaMetadata");
const typeFactory_1 = require("../../../../test-helpers/typeFactory");
const mockAssetHubKusamaData_1 = require("../assets/mockAssetHubKusamaData");
const foreignAssets_1 = require("./foreignAssets");
const typeFactoryApiV9430 = (0, typeFactory_1.createApiWithAugmentations)(assetHubKusamaMetadata_1.assetHubKusamaV14);
const factory = new typeFactory_1.TypeFactory(typeFactoryApiV9430);
const foreignAssetsEntries = () => {
    return foreignAssets_1.foreignAssetsLocations.map((location, idx) => {
        const storage = factory.storageKeyMultilocation(location, 'XcmV3MultiLocation', typeFactoryApiV9430.query.foreignAssets.asset);
        const assetInfo = mockAssetHubKusamaData_1.foreignAssetsInfo[idx]();
        return [storage, assetInfo];
    });
};
exports.foreignAssetsEntries = foreignAssetsEntries;
//# sourceMappingURL=foreignAssetsEntries.js.map