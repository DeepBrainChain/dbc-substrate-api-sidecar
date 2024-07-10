import { Logger } from 'winston';
/**
 * Access a singleton winston.Logger that will be intialized on first use.
 */
export declare class Log {
    private static _transports;
    private static _logger;
    private static create;
    /**
     * Sidecar's winston.Logger.
     */
    static get logger(): Logger;
}
