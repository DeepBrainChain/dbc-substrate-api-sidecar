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
exports.assetHubWestendControllers = void 0;
const cache_1 = require("./cache");
/**
 * Asset Hub Westend configuration for Sidecar.
 */
exports.assetHubWestendControllers = {
    controllers: [
        'AccountsAssets',
        'AccountsBalanceInfo',
        'AccountsProxyInfo',
        'AccountsPoolAssets',
        'AccountsValidate',
        'Blocks',
        'BlocksExtrinsics',
        'BlocksRawExtrinsics',
        'NodeNetwork',
        'NodeTransactionPool',
        'NodeVersion',
        'PalletsAssets',
        'PalletsAssetConversion',
        'PalletsDispatchables',
        'PalletsConsts',
        'PalletsEvents',
        'PalletsErrors',
        'PalletsPoolAssets',
        'RuntimeCode',
        'RuntimeMetadata',
        'RuntimeSpec',
        'TransactionDryRun',
        'TransactionFeeEstimate',
        'TransactionMaterial',
        'TransactionSubmit',
    ],
    options: {
        finalizes: true,
        minCalcFeeRuntime: 601,
        blockStore: (0, cache_1.initLRUCache)(),
        hasQueryFeeApi: new cache_1.QueryFeeDetailsCache(null, null),
    },
};
//# sourceMappingURL=assetHubWestendControllers.js.map