import { INodeVersion } from 'src/types/responses';
import { AbstractService } from '../AbstractService';
export declare class NodeVersionService extends AbstractService {
    fetchVersion(): Promise<INodeVersion>;
}
