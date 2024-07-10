"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PalletsAssetConversionService = void 0;
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
require("@polkadot/api-augment");
const AbstractService_1 = require("../AbstractService");
class PalletsAssetConversionService extends AbstractService_1.AbstractService {
    constructor(api) {
        super(api);
    }
    async fetchNextAvailableId(hash) {
        const { api } = this;
        const [{ number }, id] = await Promise.all([
            api.rpc.chain.getHeader(hash),
            api.query.assetConversion.nextPoolAssetId(),
        ]);
        const poolId = id.isSome ? id : '0';
        const at = {
            hash,
            height: number.unwrap().toString(10),
        };
        return {
            at,
            poolId,
        };
    }
    async fetchLiquidityPools(hash) {
        const { api } = this;
        const [{ number }, poolsInfo] = await Promise.all([
            api.rpc.chain.getHeader(hash),
            api.query.assetConversion.pools.entries(),
        ]);
        const pools = poolsInfo.map(([reserves, info]) => {
            return {
                reserves: reserves.args[0],
                lpToken: info,
            };
        });
        const at = {
            hash,
            height: number.unwrap().toString(10),
        };
        return {
            at,
            pools,
        };
    }
}
exports.PalletsAssetConversionService = PalletsAssetConversionService;
//# sourceMappingURL=PalletsAssetConversionService.js.map