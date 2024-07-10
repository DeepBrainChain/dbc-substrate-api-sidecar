import { AnyJson } from '../types/polkadot-js';
import { ISanitizeOptions } from '../types/sanitize';
/**
 * Forcibly serialize all instances of AbstractInt to base 10 and otherwise
 * normalize data presentation. We try to guarantee that data is
 * of type AnyJson, but it is not a strong guarantee.
 *
 * Under the hood AbstractInt is
 * a BN.js, which has a .toString(radix) that lets us convert to base 10.
 * The likely reason for the inconsistency in polkadot-js natives .toJSON
 * is that over a certain value some Int like types have a flag that tells
 * them to serialize to Hex.
 *
 * @param data - any arbitrary data that Sidecar might send
 * @param options - set of options specific to sanitization
 */
export declare function sanitizeNumbers(data: unknown, options?: ISanitizeOptions): AnyJson;
