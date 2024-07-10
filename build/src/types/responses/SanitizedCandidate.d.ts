import { ISanitizedBackedCandidateDescriptor } from './SanitizedBackedCandidateDescriptor';
import { ISanitizedBackedCandidateCommitments } from './SanitizedBackedCandidatesCommitments';
export interface ISanitizedCandidate {
    descriptor: ISanitizedBackedCandidateDescriptor;
    commitments: ISanitizedBackedCandidateCommitments;
}
