import { ApiDecoration } from '@polkadot/api/types';
import { BlockHash } from '@polkadot/types/interfaces';
import { BlocksTrace, BlocksTraceOperations } from '../../types/responses/BlocksTrace';
import { AbstractService } from '../AbstractService';
export declare class BlocksTraceService extends AbstractService {
    /**
     * Get the state traces for a block.
     *
     * @param hash `BlockHash` to get traces at.
     */
    traces(hash: BlockHash): Promise<BlocksTrace>;
    /**
     * Get the balance changing operations induced by a block.
     *
     * @param hash `BlockHash` to get balance transfer operations at.
     * @param historicApi ApiDecoration used to retrieve the correct registry
     * @param includeActions whether or not to include `actions` field in the response.
     */
    operations(hash: BlockHash, historicApi: ApiDecoration<'promise'>, includeActions: boolean): Promise<BlocksTraceOperations>;
    /**
     * Format the response to the `traceBlock` RPC. Primarily used to normalize data
     * for `Trace`. This essentially should return something that closesly resembles
     * the raw RPC JSON response result.
     *
     * @param blockTrace Polkadot-js BlockTrace
     */
    private static formatBlockTrace;
}
