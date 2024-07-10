import { ApiPromise } from '@polkadot/api';
import { ParasService } from '../../services';
import AbstractController from '../AbstractController';
export default class ParasController extends AbstractController<ParasService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    private getParas;
    private getParasHeadIncludedCandidates;
    private getParasHeadBackedCandidates;
    private getCrowdloanInfo;
    private getCrowdloans;
    private getLeaseInfo;
    private getLeasesCurrent;
    private getAuctionsCurrent;
    private checkParasModule;
}
