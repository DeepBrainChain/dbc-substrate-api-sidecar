import { ISidecarConfig } from './types/sidecar-config';
/**
 * Access a singleton config object that will be intialized on first use.
 */
export declare class SidecarConfig {
    private static _config;
    /**
     * Gather env vars for config and make sure they are valid.
     */
    private static create;
    /**
     * Sidecar's configuaration.
     */
    static get config(): ISidecarConfig;
}
