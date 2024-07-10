import { IDownwardMessage } from './BlockXCMMessages';
import { ISanitizedParachainInherentDataHorizontalMessage } from './SanitizedParachainInherentDataHorizontalMessage';
import { ISanitizedParachainValidationData } from './SanitizedParachainValidationData';
export interface ISanitizedParachainInherentData {
    validationData: ISanitizedParachainValidationData;
    relayChainState: `0x${string}`[];
    downwardMessages: IDownwardMessage[];
    horizontalMessages: Map<string, ISanitizedParachainInherentDataHorizontalMessage[]>;
}
