"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpErrorCounter = void 0;
const express_1 = __importDefault(require("express"));
const prom_client_1 = __importDefault(require("prom-client"));
const Log_1 = require("../logging/Log");
const parseArgs_1 = require("../parseArgs");
exports.httpErrorCounter = new prom_client_1.default.Counter({
    name: 'sas_http_errors',
    help: 'Number of HTTP Errors',
});
class Metrics_App {
    /**
     * @param appConfig configuration for app.
     */
    constructor({ host }) {
        const args = (0, parseArgs_1.parseArgs)();
        this.port = Number(args.prometheus_port);
        this.app = (0, express_1.default)();
        this.host = host;
        this.metricsEndpoint();
    }
    listen() {
        const { logger } = Log_1.Log;
        this.app.listen(this.port, this.host, () => {
            logger.info(`Metrics Server started at http://${this.host}:${this.port}/`);
        });
    }
    /**
     * Mount the metrics endpoint.
     */
    metricsEndpoint() {
        const register = new prom_client_1.default.Registry();
        register.registerMetric(exports.httpErrorCounter);
        prom_client_1.default.collectDefaultMetrics({ register, prefix: 'sas_' });
        // Set up the metrics endpoint
        this.app.get('/metrics', (_req, res) => {
            void (async () => {
                res.set('Content-Type', register.contentType);
                res.send(await register.metrics());
            })();
        });
    }
}
exports.default = Metrics_App;
//# sourceMappingURL=metrics.js.map