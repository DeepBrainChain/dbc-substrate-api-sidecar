"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const definitionsWestmint = {
    types: [
        {
            minmax: [0, 9434],
            types: {
                TempAssetId: 'Option<AssetId>',
            },
        },
        {
            minmax: [9435, undefined],
            types: {
                TempAssetId: 'Option<MultiLocation>',
            },
        },
    ],
    signedExtensions: {
        ChargeAssetTxPayment: {
            extrinsic: {
                tip: 'Compact<Balance>',
                // eslint-disable-next-line sort-keys
                assetId: 'TempAssetId',
            },
            payload: {},
        },
    },
};
const definitionsStatemine = {
    types: [
        {
            minmax: [0, 9999],
            types: {
                TempAssetId: 'Option<AssetId>',
            },
        },
        {
            minmax: [10000, undefined],
            types: {
                TempAssetId: 'Option<MultiLocation>',
            },
        },
    ],
    signedExtensions: {
        ChargeAssetTxPayment: {
            extrinsic: {
                tip: 'Compact<Balance>',
                // eslint-disable-next-line sort-keys
                assetId: 'TempAssetId',
            },
            payload: {},
        },
    },
};
exports.default = {
    spec: { statemine: definitionsStatemine, westmint: definitionsWestmint },
};
//# sourceMappingURL=typesBundle.js.map