import type { StagingXcmV3MultiLocation } from '@polkadot/types/lookup';
import type { ITuple } from '@polkadot/types-codec/types';
export declare const reserves: ITuple<[StagingXcmV3MultiLocation, StagingXcmV3MultiLocation]>[];
export declare const assets: ({
    parents: string;
    interior: {
        X2: ({
            palletInstance: string;
            generalIndex?: undefined;
        } | {
            generalIndex: string;
            palletInstance?: undefined;
        })[];
        X1?: undefined;
    };
} | {
    parents: string;
    interior: {
        X1: {
            globalConsensus: {
                polkadot: null;
            };
        };
        X2?: undefined;
    };
})[];
