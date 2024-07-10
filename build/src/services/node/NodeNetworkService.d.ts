import { INodeNetwork } from 'src/types/responses';
import { AbstractService } from '../AbstractService';
export declare class NodeNetworkService extends AbstractService {
    fetchNetwork(): Promise<INodeNetwork>;
}
