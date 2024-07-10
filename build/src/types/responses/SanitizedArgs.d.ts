import { ISanitizedCall } from '.';
import { ISanitizedParachainInherentData } from './SanitizedParachainInherentData';
import { ISanitizedParentInherentData } from './SanitizedParentInherentData';
export interface ISanitizedArgs {
    call?: ISanitizedCall;
    calls?: ISanitizedCall[];
    data?: ISanitizedParentInherentData | ISanitizedParachainInherentData;
}
