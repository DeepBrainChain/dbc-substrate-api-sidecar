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
const express_1 = __importDefault(require("express"));
const package_json_1 = __importDefault(require("../package.json"));
class App {
    /**
     * @param appConfig configuration for app.
     */
    constructor({ controllers, preMiddleware, postMiddleware, host, port }) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.host = host;
        this.initMiddleware(preMiddleware);
        this.initControllers(controllers);
        this.initRoot();
        this.initErrorMiddleware(postMiddleware);
    }
    /**
     * Mount middleware prior to mounting routes.
     *
     * @param middleware array of Middleware to mount prior to all controllers.
     */
    initMiddleware(middleware) {
        for (const ware of middleware) {
            this.app.use(ware);
        }
    }
    /**
     * Mount the router from each each controller.
     *
     * @param controllers array of Controllers
     */
    initControllers(controllers) {
        for (const c of controllers) {
            this.app.use('/', c.router);
        }
    }
    /**
     * Mount middleware after after mounting the routes.
     *
     * @param errorMiddleware array of middleware to mount last.
     */
    initErrorMiddleware(errorMiddleware) {
        for (const ware of errorMiddleware) {
            this.app.use(ware);
        }
    }
    listen() {
        return this.app.listen(this.port, this.host, () => {
            console.log(`Listening on http://${this.host}:${this.port}/`);
            console.log(`Check the root endpoint (http://${this.host}:${this.port}/) to see the available endpoints for the current node`);
        });
    }
    /**
     * Mount the root route.
     */
    initRoot() {
        // Set up a root route
        this.app.get('/', (_req, res) => res.send({
            docs: 'https://paritytech.github.io/substrate-api-sidecar/dist',
            github: 'https://github.com/paritytech/substrate-api-sidecar',
            version: package_json_1.default.version,
            listen: `${this.host}:${this.port}`,
            routes: this.getRoutes(),
        }));
    }
    /**
     * Get the routes currently mounted on the Express App. N.B. this uses
     * a private property (`_router`) on the Express App, so it should be
     * checked that this works as expected whenever updating Express dependencies.
     */
    getRoutes() {
        return this.app._router.stack.reduce((acc, middleware) => {
            var _a;
            if (middleware.route) {
                // This middleware is a route mounted directly on the app (i.e. app.get('/test', fn)
                acc.push(this.extractPathAndMethod(middleware.route));
            }
            else if (middleware.name === 'router') {
                // This middleware is an express.Router (i.e. app.use('/', express.Router()))
                (_a = middleware.handle) === null || _a === void 0 ? void 0 : _a.stack.forEach(({ route }) => {
                    if (route) {
                        acc.push(this.extractPathAndMethod(route));
                    }
                });
            }
            return acc;
        }, []);
    }
    /**
     * Helper function for `getRoutes`.
     */
    extractPathAndMethod({ path, methods }) {
        return {
            path,
            method: Object.keys(methods)[0],
        };
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map