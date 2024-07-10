/**
 * Object to house the values of all the configurable components for Sidecar.
 */
export interface ISidecarConfig {
    EXPRESS: ISidecarConfigExpress;
    SUBSTRATE: ISidecarConfigSubstrate;
    LOG: ISidecarConfigLog;
}
interface ISidecarConfigSubstrate {
    URL: string;
    TYPES_BUNDLE: string;
    TYPES_CHAIN: string;
    TYPES_SPEC: string;
    TYPES: string;
}
interface ISidecarConfigExpress {
    HOST: string;
    PORT: number;
    KEEP_ALIVE_TIMEOUT: number;
}
interface ISidecarConfigLog {
    LEVEL: string;
    JSON: boolean;
    FILTER_RPC: boolean;
    STRIP_ANSI: boolean;
    WRITE: boolean;
    WRITE_PATH: string;
    WRITE_MAX_FILE_SIZE: number;
    WRITE_MAX_FILES: number;
}
export {};
