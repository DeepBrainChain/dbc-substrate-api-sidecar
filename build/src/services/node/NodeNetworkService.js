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
exports.NodeNetworkService = void 0;
const AbstractService_1 = require("../AbstractService");
class NodeNetworkService extends AbstractService_1.AbstractService {
    async fetchNetwork() {
        const [{ peers: numPeers, isSyncing, shouldHavePeers }, localPeerId, nodeRoles, localListenAddresses] = await Promise.all([
            this.api.rpc.system.health(),
            this.api.rpc.system.localPeerId(),
            this.api.rpc.system.nodeRoles(),
            this.api.rpc.system.localListenAddresses(),
        ]);
        let peersInfo;
        try {
            peersInfo = await this.api.rpc.system.peers();
        }
        catch {
            peersInfo = 'Cannot query system_peers from node.';
        }
        return {
            nodeRoles,
            numPeers,
            isSyncing,
            shouldHavePeers,
            localPeerId,
            localListenAddresses,
            peersInfo,
        };
    }
}
exports.NodeNetworkService = NodeNetworkService;
//# sourceMappingURL=NodeNetworkService.js.map