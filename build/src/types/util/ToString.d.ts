export interface IToString {
    toString: () => string;
}
export declare function isToString(thing: unknown): thing is IToString;
