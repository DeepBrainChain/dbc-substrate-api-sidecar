export interface IUpwardMessage {
    originParaId: string;
    data: string;
}
export interface IDownwardMessage {
    sentAt: string;
    msg: string;
    data: string;
}
export interface IHorizontalMessageInParachain {
    sentAt: string;
    originParaId: string;
    data: string;
}
export interface IHorizontalMessageInRelayChain {
    originParaId: string;
    destinationParaId: string;
    data: string;
}
export interface IMessages {
    horizontalMessages?: (IHorizontalMessageInParachain | IHorizontalMessageInRelayChain)[];
    downwardMessages?: IDownwardMessage[];
    upwardMessages?: IUpwardMessage[];
}
