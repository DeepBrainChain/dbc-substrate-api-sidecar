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
const sanitizeNumbers_1 = require("../../sanitize/sanitizeNumbers");
const registries_1 = require("../../test-helpers/registries");
const mock_1 = require("../test-helpers/mock");
const balanceInfo789629_json_1 = __importDefault(require("../test-helpers/responses/accounts/balanceInfo789629.json"));
const balanceInfoFeeFrozen_json_1 = __importDefault(require("../test-helpers/responses/accounts/balanceInfoFeeFrozen.json"));
const AccountsBalanceInfoService_1 = require("./AccountsBalanceInfoService");
const locksAt = (_address) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Vec<BalanceLock>', '0x047374616b696e672000e8764817000000000000000000000002'));
const accountAt = (_address) => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('AccountInfo', '0x0600000003dbb656ab7400000000000000000000000000000000000000000000000000000000e8764817000000000000000000000000e87648170000000000000000000000'));
const accountDataAt = (_address) => Promise.resolve().then(() => {
    return {
        data: registries_1.polkadotRegistryV9370.createType('AccountData', {
            free: '100000',
            reserved: '100000',
            miscFrozen: '111111',
            feeFrozen: '111111',
        }),
        nonce: registries_1.polkadotRegistry.createType('Index', 1),
    };
});
const freeBalanceAt = () => Promise.resolve().then(() => registries_1.polkadotRegistry.createType('Balance', 123456789));
const mockHistoricApi = {
    registry: registries_1.polkadotRegistry,
    query: {
        balances: {
            freeBalance: freeBalanceAt,
            reservedBalance: async () => registries_1.polkadotRegistry.createType('Balance', 1),
            locks: locksAt,
        },
        system: {
            accountNonce: async () => registries_1.polkadotRegistry.createType('Index', 1),
            account: accountAt,
        },
    },
};
const mockApi = {
    ...mock_1.defaultMockApi,
    at: (_hash) => mockHistoricApi,
};
const accountsBalanceInfoService = new AccountsBalanceInfoService_1.AccountsBalanceInfoService(mockApi);
describe('AccountsBalanceInfoService', () => {
    describe('fetchAccountBalanceInfo', () => {
        it('works when ApiPromise works (block 789629)', async () => {
            const tempHistoricApi = { ...mockHistoricApi };
            tempHistoricApi.query.balances.freeBalance = undefined;
            const tempMockApi = {
                ...mock_1.defaultMockApi,
                at: (_hash) => tempHistoricApi,
            };
            const tempAccountsBalanceInfoService = new AccountsBalanceInfoService_1.AccountsBalanceInfoService(tempMockApi);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(await tempAccountsBalanceInfoService.fetchAccountBalanceInfo(mock_1.blockHash789629, mockHistoricApi, mock_1.testAddress, 'DOT', false))).toStrictEqual(balanceInfo789629_json_1.default);
        });
        it('works when the api does not have the frozen field in Account data', async () => {
            const tmpHistoricApi = {
                registry: registries_1.polkadotRegistry,
                query: {
                    balances: {
                        freeBalance: undefined,
                        reservedBalance: async () => registries_1.polkadotRegistry.createType('Balance', 1),
                        locks: locksAt,
                    },
                    system: {
                        accountNonce: async () => registries_1.polkadotRegistry.createType('Index', 1),
                        account: accountDataAt,
                    },
                },
            };
            const tmpMockApi = {
                ...mock_1.defaultMockApi,
                at: (_hash) => tmpHistoricApi,
            };
            const tmpAccountsBalanceInfoService = new AccountsBalanceInfoService_1.AccountsBalanceInfoService(tmpMockApi);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(await tmpAccountsBalanceInfoService.fetchAccountBalanceInfo(mock_1.blockHash789629, tmpHistoricApi, mock_1.testAddress, 'DOT', false))).toStrictEqual(balanceInfoFeeFrozen_json_1.default);
        });
        it('Correctly queries historical blocks', async () => {
            const result = await accountsBalanceInfoService.fetchAccountBalanceInfo(mock_1.blockHash789629, mockHistoricApi, mock_1.testAddress, 'DOT', false);
            const expectedResponse = {
                at: {
                    hash: '0x7b713de604a99857f6c25eacc115a4f28d2611a23d9ddff99ab0e4f1c17a8578',
                    height: '789629',
                },
                feeFrozen: '100000000000',
                free: '501090793179',
                frozen: 'frozen does not exist for this runtime',
                locks: [
                    {
                        amount: '100000000000',
                        id: '0x7374616b696e6720',
                        reasons: 'All',
                    },
                ],
                miscFrozen: '100000000000',
                nonce: '6',
                reserved: '0',
                tokenSymbol: 'DOT',
            };
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(result)).toStrictEqual(expectedResponse);
        });
        describe('token recognition', () => {
            const tokenHistoricApi = { ...mockHistoricApi };
            Object.assign(tokenHistoricApi.query.system.account, { at: true });
            tokenHistoricApi.query.balances.freeBalance = undefined;
            const tokenMockApi = {
                ...mock_1.defaultMockApi,
                at: (_hash) => tokenHistoricApi,
            };
            const tokenAccountsBalanceInfoService = new AccountsBalanceInfoService_1.AccountsBalanceInfoService(tokenMockApi);
            let tempQueryTokens, tempQueryBalance, mockTokensLocksAt, mockTokenAccountAt, mockBalancesLocksAt;
            beforeAll(() => {
                // Important: these temp values should never be reassinged. They are used so we can assign
                // the mockApi properties back to their original values after this sub-section of tests run.
                tempQueryTokens = tokenHistoricApi.query.tokens;
                tempQueryBalance = tokenHistoricApi.query.balances;
                const tokensAccountAt = async (address) => (await tokenHistoricApi.query.system.account(address)).data;
                // Wrap our functions in a jest mock so we can collect data on how they are called
                mockTokensLocksAt = jest.fn(tokenHistoricApi.query.balances.locks);
                mockTokenAccountAt = jest.fn(tokensAccountAt);
                tokenHistoricApi.query.tokens = {
                    locks: mockTokensLocksAt,
                    accounts: mockTokenAccountAt,
                };
                mockBalancesLocksAt = jest.fn(tokenHistoricApi.query.balances.locks);
                tokenHistoricApi.query.balances.locks = mockBalancesLocksAt;
            });
            afterEach(() => {
                // Clear data about how the mocks where called after each `it` test.
                mockTokensLocksAt.mockClear();
                mockTokenAccountAt.mockClear();
                mockBalancesLocksAt.mockClear();
            });
            afterAll(() => {
                tokenHistoricApi.query.tokens = tempQueryTokens;
                tokenHistoricApi.query.balances = tempQueryBalance;
            });
            it('only has `["DOT"]` (all uppercase chars) for the mockApi registry', () => {
                expect(tokenHistoricApi.registry.chainTokens).toStrictEqual(['DOT']);
                expect(tokenHistoricApi.registry.chainDecimals).toStrictEqual([12]);
            });
            it('querrys tokens pallet storage with a non-native token', async () => {
                expect((0, sanitizeNumbers_1.sanitizeNumbers)(await tokenAccountsBalanceInfoService.fetchAccountBalanceInfo(mock_1.blockHash789629, tokenHistoricApi, mock_1.testAddress, 'fOoToKeN', false)).tokenSymbol).toEqual('fOoToKeN');
                expect(mockTokensLocksAt).toBeCalled();
                expect(mockTokenAccountAt).toBeCalled();
                expect(mockBalancesLocksAt).not.toBeCalled();
            });
            it('does not query tokens pallet storage with the native token', async () => {
                expect((0, sanitizeNumbers_1.sanitizeNumbers)(await tokenAccountsBalanceInfoService.fetchAccountBalanceInfo(mock_1.blockHash789629, tokenHistoricApi, mock_1.testAddress, 'doT', false)).tokenSymbol).toEqual('doT');
                expect(mockTokensLocksAt).not.toBeCalled();
                expect(mockTokenAccountAt).not.toBeCalled();
                expect(mockBalancesLocksAt).toBeCalled();
            });
        });
    });
    describe('applyDenomination', () => {
        const balance = registries_1.polkadotRegistry.createType('Balance', 12345);
        it('Should correctly denominate a balance when balance.length <= decimal', () => {
            const ltValue = accountsBalanceInfoService['applyDenominationBalance'](balance, 7);
            const etValue = accountsBalanceInfoService['applyDenominationBalance'](balance, 5);
            expect(ltValue).toBe('.0012345');
            expect(etValue).toBe('.12345');
        });
        it('Should correctly denominate a balance when balance.length > decimal', () => {
            const value = accountsBalanceInfoService['applyDenominationBalance'](balance, 3);
            expect(value).toBe('12.345');
        });
        it('Should correctly denominate a balance when balance is equal to zero', () => {
            const zeroBalance = registries_1.polkadotRegistry.createType('Balance', 0);
            const value = accountsBalanceInfoService['applyDenominationBalance'](zeroBalance, 2);
            expect(value).toBe('0');
        });
        it('Should correctly denominate a balance when the decimal value is zero', () => {
            const value = accountsBalanceInfoService['applyDenominationBalance'](balance, 0);
            expect(value).toBe('12345');
        });
    });
    describe('denominateLocks', () => {
        it('Should correctly parse and denominate a Vec<BalanceLocks>', () => {
            const balanceLock = registries_1.polkadotRegistry.createType('BalanceLock', {
                id: '0x7374616b696e6720',
                amount: 12345,
                reasons: 'All',
            });
            const vecLocks = registries_1.polkadotRegistry.createType('Vec<BalanceLock>', [balanceLock]);
            const value = accountsBalanceInfoService['applyDenominationLocks'](vecLocks, 3);
            const expectedValue = [{ amount: '12.345', id: '0x7374616b696e6720', reasons: 'All' }];
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(value)).toStrictEqual(expectedValue);
        });
        it('Should handle an empty Vec correctly', () => {
            const vecLocks = registries_1.polkadotRegistry.createType('Vec<BalanceLock>', []);
            const value = accountsBalanceInfoService['applyDenominationLocks'](vecLocks, 3);
            expect((0, sanitizeNumbers_1.sanitizeNumbers)(value)).toStrictEqual([]);
        });
    });
});
//# sourceMappingURL=AccountsBalanceInfoService.spec.js.map