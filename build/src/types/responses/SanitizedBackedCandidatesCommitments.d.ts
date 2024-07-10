import type { ISanitizedBackedCandidateHorizontalMessage } from './SanitizedBackedCandidatesHorizontalMessage';
export interface ISanitizedBackedCandidateCommitments {
    upwardMessages: string[];
    horizontalMessages: ISanitizedBackedCandidateHorizontalMessage[];
    newValidationCode: string | undefined;
    headData: `0x${string}`;
    processedDownwardMessages: string;
    hrmpWatermark: string;
}
