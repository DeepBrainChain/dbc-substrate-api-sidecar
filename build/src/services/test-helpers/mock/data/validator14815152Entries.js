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
exports.validatorsEntries = void 0;
const polkadotV9370Metadata_1 = require("../../../../test-helpers/metadata/polkadotV9370Metadata");
const typeFactory_1 = require("../../../../test-helpers/typeFactory");
const validatorsAddresses_1 = require("./validatorsAddresses");
const typeFactoryApiV9370 = (0, typeFactory_1.createApiWithAugmentations)(polkadotV9370Metadata_1.polkadotMetadataRpcV9370);
const factory = new typeFactory_1.TypeFactory(typeFactoryApiV9370);
const validatorsEntries = () => {
    return validatorsAddresses_1.validatorsAddresses.map((addr) => {
        const storage = factory.storageKey(addr, 'AccountId32', typeFactoryApiV9370.query.staking.validators);
        return [storage];
    });
};
exports.validatorsEntries = validatorsEntries;
//# sourceMappingURL=validator14815152Entries.js.map