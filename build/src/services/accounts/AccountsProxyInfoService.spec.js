"use strict";
// Copyright 2017-2024 Parity Technologies (UK) Ltd.
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
const polkadotV1000001Metadata_1 = require("../../test-helpers/metadata/polkadotV1000001Metadata");
const registries_1 = require("../../test-helpers/registries");
const typeFactory_1 = require("../../test-helpers/typeFactory");
const mock_1 = require("../test-helpers/mock");
const AccountsProxyInfoService_1 = require("./AccountsProxyInfoService");
const factoryApi = (0, typeFactory_1.createApiWithAugmentations)(polkadotV1000001Metadata_1.polkadotMetadataRpcV1000001);
const factory = new typeFactory_1.TypeFactory(factoryApi);
const proxies = () => Promise.resolve().then(() => {
    const vec = factory.vecOf([
        registries_1.polkadotRegistryV1000001.createType('PalletProxyProxyDefinition', {
            delegate: '12TzkPCrVfrZxupsdkt3vxZQS7Ajw3DVcpFpBH2PBDU4Uyja',
            proxyType: 'Staking',
            delay: '0',
        }),
        registries_1.polkadotRegistryV1000001.createType('PalletProxyProxyDefinition', {
            delegate: '14hS1sUjM1GRdYG3GthbncPecsAwcRUKKXd4YWXYFrXC8Qqr',
            proxyType: 'Any',
            delay: '0',
        }),
    ]);
    return [vec, registries_1.polkadotRegistryV1000001.createType('u128', '1000000000')];
});
const historicApi = {
    query: {
        proxy: {
            proxies,
        },
    },
};
const mockApi = {
    ...mock_1.defaultMockApi,
    at: (_hash) => historicApi,
};
const accountsProxyInfoService = new AccountsProxyInfoService_1.AccountsProxyInfoService(mockApi);
describe('AccountsProxyInfoService', () => {
    it('Should correctly query proxies', async () => {
        const res = await accountsProxyInfoService.fetchAccountProxyInfo(mock_1.blockHash789629, '12oMWhAvv3rRUU1etckbDipaF9orZpkgPeoPPCLY43gJZ3BJ');
        expect((0, sanitizeNumbers_1.sanitizeNumbers)(res)).toStrictEqual({
            at: {
                hash: '0x7b713de604a99857f6c25eacc115a4f28d2611a23d9ddff99ab0e4f1c17a8578',
                height: '789629',
            },
            delegatedAccounts: [
                {
                    delay: '0',
                    delegate: '12TzkPCrVfrZxupsdkt3vxZQS7Ajw3DVcpFpBH2PBDU4Uyja',
                    proxyType: 'Staking',
                },
                {
                    delay: '0',
                    delegate: '14hS1sUjM1GRdYG3GthbncPecsAwcRUKKXd4YWXYFrXC8Qqr',
                    proxyType: 'Any',
                },
            ],
            depositHeld: '1000000000',
        });
    });
});
//# sourceMappingURL=AccountsProxyInfoService.spec.js.map