export interface IToJSONable {
    toJSON: () => any;
}
export declare function isToJSONable(thing: unknown): thing is IToJSONable;
