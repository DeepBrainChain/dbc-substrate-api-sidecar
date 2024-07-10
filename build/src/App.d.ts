/// <reference types="node" />
import { ErrorRequestHandler, RequestHandler } from 'express';
import { Server } from 'http';
import AbstractController from './controllers/AbstractController';
import { AbstractService } from './services/AbstractService';
interface IAppConfiguration {
    controllers: AbstractController<AbstractService>[];
    preMiddleware: RequestHandler[];
    postMiddleware: ErrorRequestHandler[];
    port: number;
    host: string;
}
export default class App {
    private app;
    private readonly port;
    private readonly host;
    /**
     * @param appConfig configuration for app.
     */
    constructor({ controllers, preMiddleware, postMiddleware, host, port }: IAppConfiguration);
    /**
     * Mount middleware prior to mounting routes.
     *
     * @param middleware array of Middleware to mount prior to all controllers.
     */
    private initMiddleware;
    /**
     * Mount the router from each each controller.
     *
     * @param controllers array of Controllers
     */
    private initControllers;
    /**
     * Mount middleware after after mounting the routes.
     *
     * @param errorMiddleware array of middleware to mount last.
     */
    private initErrorMiddleware;
    listen(): Server;
    /**
     * Mount the root route.
     */
    private initRoot;
    /**
     * Get the routes currently mounted on the Express App. N.B. this uses
     * a private property (`_router`) on the Express App, so it should be
     * checked that this works as expected whenever updating Express dependencies.
     */
    private getRoutes;
    /**
     * Helper function for `getRoutes`.
     */
    private extractPathAndMethod;
}
export {};
