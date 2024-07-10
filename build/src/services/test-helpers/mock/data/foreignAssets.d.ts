export declare const foreignAssetsLocations: ({
    parents: string;
    interior: {
        X1: {
            GlobalConsensus: string;
        };
    };
} | {
    parents: string;
    interior: {
        X2: ({
            Parachain: string;
            GeneralIndex?: undefined;
        } | {
            GeneralIndex: string;
            Parachain?: undefined;
        })[];
    };
})[];
