import { ISanitizedBackedCandidateExplicitValidityVote, ISanitizedBackedCandidateImplicitValidityVote } from './SanitizedBackedCandidateValidityVotes';
import { ISanitizedCandidate } from './SanitizedCandidate';
export interface ISanitizedBackedCandidate {
    candidate: ISanitizedCandidate;
    validityVotes: (ISanitizedBackedCandidateExplicitValidityVote | ISanitizedBackedCandidateImplicitValidityVote)[];
    validatorIndices: `0x${string}`;
}
