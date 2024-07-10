import { ApiPromise } from '@polkadot/api';
import AbstractController from '../controllers/AbstractController';
import { AbstractService } from '../services/AbstractService';
/**
 * Return an array of instantiated controller instances based off of a `specName`.
 *
 * @param api ApiPromise to inject into controllers
 * @param implName
 */
export declare function getControllersForSpec(api: ApiPromise, specName: string): AbstractController<AbstractService>[];
