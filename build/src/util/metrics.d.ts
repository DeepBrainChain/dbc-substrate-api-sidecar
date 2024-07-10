import client from 'prom-client';
export declare const httpErrorCounter: client.Counter<string>;
interface IAppConfiguration {
    port: number;
    host: string;
}
export default class Metrics_App {
    private app;
    private readonly port;
    private readonly host;
    /**
     * @param appConfig configuration for app.
     */
    constructor({ host }: IAppConfiguration);
    listen(): void;
    /**
     * Mount the metrics endpoint.
     */
    private metricsEndpoint;
}
export {};
