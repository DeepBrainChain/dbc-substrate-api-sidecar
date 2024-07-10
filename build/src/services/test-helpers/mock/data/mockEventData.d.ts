import { ISanitizedEvent } from '../../../../types/responses';
/**
 *  Construct events for testing.
 */
export declare const constructEvent: (pallet: string, method: string, data: string[]) => ISanitizedEvent;
export declare const withdrawEvent: ISanitizedEvent[];
export declare const withdrawEventForTip: ISanitizedEvent[];
export declare const treasuryEvent: ISanitizedEvent[];
export declare const balancesDepositEvent: ISanitizedEvent[];
