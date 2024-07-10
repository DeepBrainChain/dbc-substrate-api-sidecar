export declare const metadataFlipper: {
    source: {
        hash: string;
        language: string;
        compiler: string;
    };
    contract: {
        name: string;
        version: string;
        authors: string[];
    };
    V3: {
        spec: {
            constructors: {
                args: {
                    label: string;
                    type: {
                        displayName: string[];
                        type: number;
                    };
                }[];
                docs: string[];
                label: string;
                payable: boolean;
                selector: string;
            }[];
            docs: never[];
            events: never[];
            messages: ({
                args: never[];
                docs: string[];
                label: string;
                mutates: boolean;
                payable: boolean;
                returnType: null;
                selector: string;
            } | {
                args: never[];
                docs: string[];
                label: string;
                mutates: boolean;
                payable: boolean;
                returnType: {
                    displayName: string[];
                    type: number;
                };
                selector: string;
            })[];
        };
        storage: {
            struct: {
                fields: {
                    layout: {
                        cell: {
                            key: string;
                            ty: number;
                        };
                    };
                    name: string;
                }[];
            };
        };
        types: {
            id: number;
            type: {
                def: {
                    primitive: string;
                };
            };
        }[];
    };
};
