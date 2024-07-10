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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PalletsStorage = exports.PalletsStakingValidators = exports.PalletsStakingProgress = exports.PalletsPoolAssets = exports.PalletsNominationPools = exports.PalletsForeignAssets = exports.PalletsEvents = exports.PalletsErrors = exports.PalletsDispatchables = exports.PalletsConsts = exports.PalletsAssets = exports.PalletsAssetConversion = void 0;
var PalletsAssetConversionController_1 = require("./PalletsAssetConversionController");
Object.defineProperty(exports, "PalletsAssetConversion", { enumerable: true, get: function () { return __importDefault(PalletsAssetConversionController_1).default; } });
var PalletsAssetsController_1 = require("./PalletsAssetsController");
Object.defineProperty(exports, "PalletsAssets", { enumerable: true, get: function () { return __importDefault(PalletsAssetsController_1).default; } });
var PalletsConstsController_1 = require("./PalletsConstsController");
Object.defineProperty(exports, "PalletsConsts", { enumerable: true, get: function () { return __importDefault(PalletsConstsController_1).default; } });
var PalletsDispatchablesController_1 = require("./PalletsDispatchablesController");
Object.defineProperty(exports, "PalletsDispatchables", { enumerable: true, get: function () { return __importDefault(PalletsDispatchablesController_1).default; } });
var PalletsErrorsController_1 = require("./PalletsErrorsController");
Object.defineProperty(exports, "PalletsErrors", { enumerable: true, get: function () { return __importDefault(PalletsErrorsController_1).default; } });
var PalletsEventsController_1 = require("./PalletsEventsController");
Object.defineProperty(exports, "PalletsEvents", { enumerable: true, get: function () { return __importDefault(PalletsEventsController_1).default; } });
var PalletsForeignAssetsController_1 = require("./PalletsForeignAssetsController");
Object.defineProperty(exports, "PalletsForeignAssets", { enumerable: true, get: function () { return __importDefault(PalletsForeignAssetsController_1).default; } });
var PalletsNominationPoolsController_1 = require("./PalletsNominationPoolsController");
Object.defineProperty(exports, "PalletsNominationPools", { enumerable: true, get: function () { return __importDefault(PalletsNominationPoolsController_1).default; } });
var PalletsPoolAssetsController_1 = require("./PalletsPoolAssetsController");
Object.defineProperty(exports, "PalletsPoolAssets", { enumerable: true, get: function () { return __importDefault(PalletsPoolAssetsController_1).default; } });
var PalletsStakingProgressController_1 = require("./PalletsStakingProgressController");
Object.defineProperty(exports, "PalletsStakingProgress", { enumerable: true, get: function () { return __importDefault(PalletsStakingProgressController_1).default; } });
var PalletsStakingValidatorsController_1 = require("./PalletsStakingValidatorsController");
Object.defineProperty(exports, "PalletsStakingValidators", { enumerable: true, get: function () { return __importDefault(PalletsStakingValidatorsController_1).default; } });
var PalletsStorageController_1 = require("./PalletsStorageController");
Object.defineProperty(exports, "PalletsStorage", { enumerable: true, get: function () { return __importDefault(PalletsStorageController_1).default; } });
//# sourceMappingURL=index.js.map