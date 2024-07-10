"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbcControllers = void 0;
const cache_1 = require("./cache");
// import { getBlockWeight } from './metadata-consts';
/**
 * Statemine configuration for Sidecar.
 */
exports.dbcControllers = {
    controllers: [
        'AccountsBalanceInfo',
        'AccountsValidate',
        'Blocks',
        'BlocksExtrinsics',
        'BlocksRawExtrinsics',
        'NodeNetwork',
        'NodeTransactionPool',
        'NodeVersion',
        'PalletsStorage',
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
        minCalcFeeRuntime: 2,
        blockStore: (0, cache_1.initLRUCache)(),
        hasQueryFeeApi: new cache_1.QueryFeeDetailsCache(null, null),
    },
};
//# sourceMappingURL=dbcControllers.js.map