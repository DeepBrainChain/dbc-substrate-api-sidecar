export declare const getPalletEvents: {
    democracy: {
        Proposed: {
            meta: {
                name: string;
                fields: import("@polkadot/types-codec").Vec<import("@polkadot/types/interfaces").Si1Field>;
                index: import("@polkadot/types-codec").U8;
                docs: import("@polkadot/types-codec").Vec<import("@polkadot/types-codec").Text>;
                args: import("@polkadot/types-codec").Vec<import("@polkadot/types-codec").Text>;
            };
        };
        Tabled: {
            meta: {
                name: string;
                fields: import("@polkadot/types-codec").Vec<import("@polkadot/types/interfaces").Si1Field>;
                index: import("@polkadot/types-codec").U8;
                docs: import("@polkadot/types-codec").Vec<import("@polkadot/types-codec").Text>;
                args: import("@polkadot/types-codec").Vec<import("@polkadot/types-codec").Type>;
            };
        };
        ExternalTabled: {
            meta: {
                name: string;
                fields: import("@polkadot/types-codec").Vec<import("@polkadot/types/interfaces").Si1Field>;
                index: import("@polkadot/types-codec").U8;
                docs: import("@polkadot/types-codec").Vec<import("@polkadot/types-codec").Text>;
                args: import("@polkadot/types-codec").Vec<import("@polkadot/types-codec").Text>;
            };
        };
    };
};
