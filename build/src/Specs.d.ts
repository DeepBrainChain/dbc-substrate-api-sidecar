import { ConfigSpecs } from 'confmgr';
/**
 * Access a singleton specification for config enviroment variables that will
 * be initialized on first use.
 */
export declare class Specs {
    private static _specs;
    private static create;
    /**
     * Configurable enviroment variable specifications.
     */
    static get specs(): ConfigSpecs;
    /**
     * EXPRESS module of the enviroment variable configuration specification.
     */
    private static appendExpressSpecs;
    /**
     * SUBSTRATE module of the enviroment variable configuration specification.
     */
    private static appendSubstrateSpecs;
    /**
     * LOG module of the enviroment variable configuration specification.
     */
    private static appendLogSpecs;
}
