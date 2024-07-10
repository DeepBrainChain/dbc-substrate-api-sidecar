export interface IAccountConvert {
    ss58Prefix: number | null;
    network: string | null;
    address: string | null;
    accountId: string | null;
    scheme: string | null;
    publicKey: boolean;
}
