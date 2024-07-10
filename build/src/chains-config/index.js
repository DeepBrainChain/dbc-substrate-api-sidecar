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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getControllersForSpec = void 0;
const controllers_1 = require("../controllers");
const acalaControllers_1 = require("./acalaControllers");
const assetHubKusamaControllers_1 = require("./assetHubKusamaControllers");
const assetHubPolkadotControllers_1 = require("./assetHubPolkadotControllers");
const assetHubWestendControllers_1 = require("./assetHubWestendControllers");
const astarControllers_1 = require("./astarControllers");
const bifrostControllers_1 = require("./bifrostControllers");
const bifrostPolkadotControllers_1 = require("./bifrostPolkadotControllers");
const calamariControllers_1 = require("./calamariControllers");
const crustControllers_1 = require("./crustControllers");
const defaultControllers_1 = require("./defaultControllers");
const dockMainnetControllers_1 = require("./dockMainnetControllers");
const dockPoSMainnetControllers_1 = require("./dockPoSMainnetControllers");
const dockPoSTestnetControllers_1 = require("./dockPoSTestnetControllers");
const heikoControllers_1 = require("./heikoControllers");
const karuraControllers_1 = require("./karuraControllers");
const kiltControllers_1 = require("./kiltControllers");
const kulupuControllers_1 = require("./kulupuControllers");
const kusamaControllers_1 = require("./kusamaControllers");
const mandalaControllers_1 = require("./mandalaControllers");
const mantaControllers_1 = require("./mantaControllers");
const parallelControllers_1 = require("./parallelControllers");
const polkadotControllers_1 = require("./polkadotControllers");
const polymeshControllers_1 = require("./polymeshControllers");
const shidenControllers_1 = require("./shidenControllers");
const soraControllers_1 = require("./soraControllers");
const westendControllers_1 = require("./westendControllers");
const dbcControllers_1 = require("./dbcControllers");
const specToControllerMap = {
    westend: westendControllers_1.westendControllers,
    polkadot: polkadotControllers_1.polkadotControllers,
    polymesh: polymeshControllers_1.polymeshControllers,
    kusama: kusamaControllers_1.kusamaControllers,
    kulupu: kulupuControllers_1.kulupuControllers,
    kilt: kiltControllers_1.kiltControllers,
    mandala: mandalaControllers_1.mandalaControllers,
    'dock-main-runtime': dockMainnetControllers_1.dockMainnetControllers,
    'dock-pos-main-runtime': dockPoSMainnetControllers_1.dockPoSMainnetControllers,
    'dock-pos-test-runtime': dockPoSTestnetControllers_1.dockTestnetControllers,
    'asset-hub-kusama': assetHubKusamaControllers_1.assetHubKusamaControllers,
    'asset-hub-polkadot': assetHubPolkadotControllers_1.assetHubPolkadotControllers,
    statemine: assetHubKusamaControllers_1.assetHubKusamaControllers,
    statemint: assetHubPolkadotControllers_1.assetHubPolkadotControllers,
    westmine: assetHubKusamaControllers_1.assetHubKusamaControllers,
    'asset-hub-westend': assetHubWestendControllers_1.assetHubWestendControllers,
    westmint: assetHubWestendControllers_1.assetHubWestendControllers,
    shiden: shidenControllers_1.shidenControllers,
    astar: astarControllers_1.astarControllers,
    sora: soraControllers_1.soraControllers,
    calamari: calamariControllers_1.calamariControllers,
    karura: karuraControllers_1.karuraControllers,
    acala: acalaControllers_1.acalaControllers,
    manta: mantaControllers_1.mantaControllers,
    crust: crustControllers_1.crustControllers,
    bifrost: bifrostControllers_1.bifrostControllers,
    bifrost_polkadot: bifrostPolkadotControllers_1.bifrostPolkadotControllers,
    heiko: heikoControllers_1.heikoControllers,
    parallel: parallelControllers_1.parallelControllers,
    node: dbcControllers_1.dbcControllers,
};
/**
 * Return an array of instantiated controller instances based off of a `specName`.
 *
 * @param api ApiPromise to inject into controllers
 * @param implName
 */
function getControllersForSpec(api, specName) {
    if (specToControllerMap[specName]) {
        return getControllersFromConfig(api, specToControllerMap[specName]);
    }
    // If we don't have the specName in the specToControllerMap we use the default
    // contoller config
    return getControllersFromConfig(api, defaultControllers_1.defaultControllers);
}
exports.getControllersForSpec = getControllersForSpec;
/**
 * Return an array of instantiated controller instances based off of a
 * `ControllerConfig`.
 *
 * @param api ApiPromise to inject into controllers
 * @param config controller mount configuration object
 */
function getControllersFromConfig(api, config) {
    const controllersToInclude = config.controllers;
    return controllersToInclude.reduce((acc, controller) => {
        acc.push(new controllers_1.controllers[controller](api, config.options));
        return acc;
    }, []);
}
//# sourceMappingURL=index.js.map