/**
 * When checking the cache there are 3 possible choices to return.
 */
declare enum QueryFee {
    /**
     * queryFeeDetails is available
     */
    available = "available",
    /**
     * queryFeeDetails is not available
     */
    notAvailable = "notAvailable",
    /**
     * We dont know is queryFeeDetails is available
     */
    unknown = "unknown"
}
/**
 * Note: This cache is necessary as a work around since there is no way to find out
 * if TransactionPaymentApi::query_feeDetails is an available call. The runtimeApi version
 * was not bumped when query_feeDetails was added, therefore polkadot-js will error if it
 * is called when it doesn't exist.
 */
export declare class QueryFeeDetailsCache {
    /**
     * Highest known runtime that doesn't have queryFeeDetails.
     */
    private _registerWithoutCall;
    /**
     * Lowest known runtime that has queryFeeDetails.
     */
    private _registerWithCall;
    constructor(registerWithoutCall: number | null, registerWithCall: number | null);
    /**
     * Checks whether the current runtime version has access to the runtime API: `TransactionPaymentApi`
     *
     * @param specVersion Current specVersion to check.
     */
    hasQueryFeeDetails(specVersion: number): QueryFee;
    /**
     * Set the _registerWithoutCall. This would represent the highest
     * known runtime that doesn't have queryFeeDetails.
     *
     * @param specVersion Current specVersion being called.
     */
    setRegisterWithoutCall(specVersion: number): void;
    /**
     * Set the _registerWithCall. This would represent the lowest known
     * runtime that has queryFeeDetails.
     *
     * @param specVersion Current specVersion being called.
     */
    setRegisterWithCall(specVersion: number): void;
}
export {};
