import { BlockHash } from '@polkadot/types/interfaces';
import { IRuntimeSpec } from 'src/types/responses';
import { AbstractService } from '../AbstractService';
export declare class RuntimeSpecService extends AbstractService {
    fetchSpec(hash: BlockHash): Promise<IRuntimeSpec>;
}
