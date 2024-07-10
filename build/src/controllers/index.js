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
exports.controllers = void 0;
const accounts_1 = require("./accounts");
const blocks_1 = require("./blocks");
const contracts_1 = require("./contracts");
const node_1 = require("./node");
const pallets_1 = require("./pallets");
const paras_1 = require("./paras");
const runtime_1 = require("./runtime");
const transaction_1 = require("./transaction");
/**
 * Object containing every controller class definition.
 */
exports.controllers = {
    Blocks: blocks_1.Blocks,
    BlocksExtrinsics: blocks_1.BlocksExtrinsics,
    BlocksTrace: blocks_1.BlocksTrace,
    BlocksRawExtrinsics: blocks_1.BlocksRawExtrinsics,
    AccountsAssets: accounts_1.AccountsAssets,
    AccountsBalanceInfo: accounts_1.AccountsBalanceInfo,
    AccountsConvert: accounts_1.AccountsConvert,
    AccountsPoolAssets: accounts_1.AccountsPoolAssets,
    AccountsProxyInfo: accounts_1.AccountsProxyInfo,
    AccountsStakingInfo: accounts_1.AccountsStakingInfo,
    AccountsValidate: accounts_1.AccountsValidate,
    AccountsVestingInfo: accounts_1.AccountsVestingInfo,
    AccountsStakingPayouts: accounts_1.AccountsStakingPayouts,
    ContractsInk: contracts_1.ContractsInk,
    PalletsAssets: pallets_1.PalletsAssets,
    PalletsAssetConversion: pallets_1.PalletsAssetConversion,
    PalletsDispatchables: pallets_1.PalletsDispatchables,
    PalletsConsts: pallets_1.PalletsConsts,
    PalletsErrors: pallets_1.PalletsErrors,
    PalletsEvents: pallets_1.PalletsEvents,
    PalletsForeignAssets: pallets_1.PalletsForeignAssets,
    PalletsNominationPools: pallets_1.PalletsNominationPools,
    PalletsPoolAssets: pallets_1.PalletsPoolAssets,
    PalletsStakingProgress: pallets_1.PalletsStakingProgress,
    PalletsStakingValidators: pallets_1.PalletsStakingValidators,
    PalletsStorage: pallets_1.PalletsStorage,
    NodeNetwork: node_1.NodeNetwork,
    NodeTransactionPool: node_1.NodeTransactionPool,
    NodeVersion: node_1.NodeVersion,
    RuntimeCode: runtime_1.RuntimeCode,
    RuntimeMetadata: runtime_1.RuntimeMetadata,
    RuntimeSpec: runtime_1.RuntimeSpec,
    TransactionDryRun: transaction_1.TransactionDryRun,
    TransactionFeeEstimate: transaction_1.TransactionFeeEstimate,
    TransactionMaterial: transaction_1.TransactionMaterial,
    TransactionSubmit: transaction_1.TransactionSubmit,
    Paras: paras_1.Paras,
};
//# sourceMappingURL=index.js.map