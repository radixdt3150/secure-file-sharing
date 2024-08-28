// common package imports
import express, { Application, Router } from 'express';
import { createServer, Server } from 'http';
import cookieParser from 'cookie-parser';

// Routing
import { assembleRoutes } from './routes';

// Application class
class App {
    private expressApp: Application;
    private httpServer: Server | undefined;

    constructor() {
        this.expressApp = express();
        this.initHttpServer();
        this.parseRequestBody();
        this.parseCookies();

        this.mountRoutes();
    }

    initHttpServer(): void {
        this.httpServer = createServer(this.expressApp);
    }

    getHttpServer(): Server | undefined {
        return this.httpServer;
    }

    getExpressApp(): Application {
        return this.expressApp;
    }

    mountRoutes(): void {
        const router = Router();
        assembleRoutes(router);
        this.expressApp.use('/api/', router); // api routes
    }

    parseRequestBody(): void {
        this.expressApp.use(express.urlencoded({ extended: true }));
        this.expressApp.use(express.json());
    }

    parseCookies = (): void => {
        this.expressApp.use(cookieParser());
    }
}

const app = new App();

export default app.getHttpServer();
export const expressApp = app.getExpressApp();

