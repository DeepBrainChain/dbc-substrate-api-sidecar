import { RequestHandler } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';
/**
 * Body for RequestHandlerTx. In other words, the body of a POST route that sends an encoded transaction.
 */
export interface ITx {
    tx: string;
}
/**
 * Body for the RequestHandlerContract. In other words, the body of the POST route that a message to a contract.
 */
export type IBodyContractMetadata = Record<string, unknown>;
/**
 * Post Request - assuming no url params
 */
export type IPostRequestHandler<T, P = Query> = RequestHandler<ParamsDictionary, unknown, T, P>;
export interface INumberParam extends ParamsDictionary {
    number: string;
}
export interface IAddressParam extends ParamsDictionary {
    address: string;
}
export interface IAddressNumberParams extends IAddressParam {
    number: string;
}
export interface IParaIdParam extends ParamsDictionary {
    paraId: string;
}
export interface IRangeQueryParam extends Query {
    range: string;
}
export interface IPalletsDispatchablesParam extends ParamsDictionary {
    palletId: string;
    dispatchableItemId: string;
}
export interface IContractQueryParam extends Query {
    method: string;
    args: string[];
    gasLimit: string;
    storageDepositLimit: string;
}
export interface IPalletsConstantsParam extends ParamsDictionary {
    palletId: string;
    constantItemId: string;
}
export interface IPalletsErrorsParam extends ParamsDictionary {
    palletId: string;
    errorItemId: string;
}
export interface IPalletsEventsParam extends ParamsDictionary {
    palletId: string;
    eventItemId: string;
}
export interface IPalletsStorageParam extends ParamsDictionary {
    palletId: string;
    storageItemId: string;
}
export interface IPalletsStorageQueryParam extends Query {
    keys: string[];
    metadata: string;
}
export interface IConvertQueryParams extends Query {
    scheme: string;
    prefix: string;
    publicKey: string;
}
