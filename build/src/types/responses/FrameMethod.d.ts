export interface IFrameMethod {
    pallet: string;
    method: string;
}
export declare function isFrameMethod(thing: unknown): thing is IFrameMethod;
