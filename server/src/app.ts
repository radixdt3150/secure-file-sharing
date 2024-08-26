// common package imports
import express, { Application, Router } from 'express';
import { createServer, Server } from 'http';
import cookieParser from 'cookie-parser';

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
        this.parseRequestBody();
        this.parseCookies();

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
