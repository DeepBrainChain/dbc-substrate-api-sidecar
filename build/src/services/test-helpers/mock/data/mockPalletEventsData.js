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
exports.getPalletEvents = void 0;
const registries_1 = require("../../../../test-helpers/registries");
exports.getPalletEvents = {
    democracy: {
        Proposed: {
            meta: {
                name: 'Proposed',
                fields: registries_1.polkadotRegistryV9300.createType('Vec<Si1Field>', [
                    {
                        name: null,
                        type: '127',
                        typeName: null,
                        docs: [],
                    },
                    {
                        name: null,
                        type: '41',
                        typeName: null,
                        docs: [],
                    },
                ]),
                index: registries_1.polkadotRegistryV9300.createType('u8', 0),
                docs: registries_1.polkadotRegistryV9300.createType('Vec<Text>', [' A motion has been proposed by a public account.']),
                args: registries_1.polkadotRegistryV9300.createType('Vec<Text>', ['PropIndex', 'Balance']),
            },
        },
        Tabled: {
            meta: {
                name: 'Tabled',
                fields: registries_1.polkadotRegistryV9300.createType('Vec<Si1Field>', [
                    {
                        name: null,
                        type: '127',
                        typeName: null,
                        docs: [],
                    },
                    {
                        name: null,
                        type: '41',
                        typeName: null,
                        docs: [],
                    },
                    {
                        name: null,
                        type: '37',
                        typeName: null,
                        docs: [],
                    },
                ]),
                index: registries_1.polkadotRegistryV9300.createType('u8', 1),
                docs: registries_1.polkadotRegistryV9300.createType('Vec<Text>', [
                    ' A public proposal has been tabled for referendum vote.',
                ]),
                args: registries_1.polkadotRegistryV9300.createType('Vec<Type>', ['PropIndex', 'Balance', 'Vec<AccountId>']),
            },
        },
        ExternalTabled: {
            meta: {
                name: 'ExternalTabled',
                fields: registries_1.polkadotRegistryV9300.createType('Vec<Si1Field>', []),
                index: registries_1.polkadotRegistryV9300.createType('u8', 2),
                docs: registries_1.polkadotRegistryV9300.createType('Vec<Text>', [' An external proposal has been tabled.']),
                args: registries_1.polkadotRegistryV9300.createType('Vec<Text>', []),
            },
        },
    },
};
//# sourceMappingURL=mockPalletEventsData.js.map