// common package imports
import express, { Application, Router } from 'express';
import { createServer, Server } from 'http';

// Routing
import { assembleRoutes } from './routes';

// DB
import dbHandler from "./database"

// Application class
class App {
    private expressApp: Application;
    private httpServer: Server | undefined;

    constructor() {
        this.expressApp = express();
        this.initHttpServer();

        this.mountRoutes();

        this.dbConnect();
    }

    initHttpServer(): void {
        this.httpServer = createServer(this.expressApp);
    }

    getHttpServer(): Server | undefined {
        return this.httpServer;
    }

    mountRoutes(): void {
        const router = Router();
        assembleRoutes(router);
        this.expressApp.use('/api/', router); // api routes
    }

    dbConnect(): void {
        try {
            dbHandler.connect();
        } catch {
            dbHandler.disconnect();
        }
    }
}

const app = new App();

export default app.getHttpServer();
