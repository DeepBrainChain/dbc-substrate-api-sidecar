import { IBlockRaw } from './BlockRaw';
import { ISanitizedBackedCandidate } from './SanitizedBackedCandidate';
import { ISanitizedBitfield } from './SanitizedBitfield';
import { ISanitizedDisputeStatementSet } from './SanitizediDisputeStatementSet';
export interface ISanitizedParentInherentData {
    bitfields: ISanitizedBitfield[];
    backedCandidates: ISanitizedBackedCandidate[];
    disputes: ISanitizedDisputeStatementSet[];
    parentHeader: IBlockRaw;
}
