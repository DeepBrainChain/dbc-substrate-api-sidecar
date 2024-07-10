import { ApiPromise } from '@polkadot/api';
import { PalletsEventsService } from '../../services';
import AbstractController from '../AbstractController';
export default class PalletsEventsController extends AbstractController<PalletsEventsService> {
    constructor(api: ApiPromise);
    protected initRoutes(): void;
    private getEventById;
    private getEvents;
}
