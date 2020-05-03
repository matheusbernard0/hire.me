import express, {Application, Router} from 'express';
import {ShortenerController} from './controller/ShortenerController';
import asyncHandler from 'express-async-handler';
import {createConnection} from "typeorm";
import {ShortenerService} from "./service/ShortenerService";
import {ShortenerRepository} from "./repository/ShortenerRepository";
import shortenerErrorHandler from "./error/handler/shortenerErrorHandler";

class ApplicationBuilder {

    private static setRouters(app: Application): void {

        const shortenerController = ApplicationBuilder.createController();

        const shortenerRouter: Router = Router();

        shortenerRouter.put('/create', asyncHandler(shortenerController.create));
        shortenerRouter.get('/retrieve/:alias', asyncHandler(shortenerController.retrieve));
        shortenerRouter.get('/mostVisiteds/:quantity', asyncHandler(shortenerController.mostVisiteds));

        app.use('/shortener', shortenerRouter);
    }

    private static setErrorHandler(app: Application): void {
        app.use(shortenerErrorHandler)
    };

    private static async createDatabaseConnection(): Promise<void> {
        await createConnection();
        return;
    }

    private static createController(): ShortenerController {
        return new ShortenerController(new ShortenerService(new ShortenerRepository()));
    }

    public static async build(): Promise<Application> {

        // cria conexão com o banco de dados
        await ApplicationBuilder.createDatabaseConnection();

        //cria e configura o express
        const application: Application = express();
        application.use(express.json());

        ApplicationBuilder.setRouters(application);
        ApplicationBuilder.setErrorHandler(application);

        return application;
    }
}

export default ApplicationBuilder;