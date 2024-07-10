export type IOption<T> = T | null;
/**
 * Check if a `IOption` is `T`.
 *
 * @param option api-sidecar TS option type, conceptually mimics Rust option
 */
export declare function isSome<T>(option: IOption<T>): option is T;
/**
 * Check if a something is null. Meant to complement `isSome` for `IOption`.
 *
 * @param thing unknown value
 */
export declare function isNull(thing: unknown): thing is null;
