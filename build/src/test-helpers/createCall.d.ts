import { Call } from '@polkadot/types/interfaces';
import { Codec } from '@polkadot/types/types/codec';
type CallArgValues = string | number | Codec | Call | CallArgValues[];
type CallArgs = {
    [i: string]: CallArgValues | CallArgs;
};
/**
 * Create a polkadot-js Call using decorated metadata. Useful for testing that
 * needs a Call.
 *
 * TODO: This should be switched to polkadotRegistry as we will phase out kusamaRegisty.
 *
 * @param pallet name of pallet in metadata (lowercase)
 * @param method name of method in metadata (lowercase)
 * @param args arguments to call as an object
 */
export declare function createCall(pallet: string, method: string, args: CallArgs): Call;
export {};
