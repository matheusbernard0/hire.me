import express, {Application} from 'express';
import {createConnection} from 'typeorm';
import shortenerErrorHandler from './error/handler/shortenerErrorHandler';
import {RouterBuilder} from './router/ShortenerRouterBuilder';
import logger from './log/ShortenerLogger';

class ApplicationBuilder {

    private static setRouters(app: Application): void {
        logger.info('Setting routers ...');
        app.use('/shortener', RouterBuilder.build());
    }

    private static setErrorHandler(app: Application): void {
        logger.info('Setting error handler ...');
        app.use(shortenerErrorHandler)
    };

    private static async createDatabaseConnection(): Promise<void> {
        logger.info('Creating database connection ...');
        await createConnection();
        return;
    }

    public static async build(): Promise<Application> {
        await ApplicationBuilder.createDatabaseConnection();

        const application = ApplicationBuilder.createApplicationInstance();

        ApplicationBuilder.setRouters(application);
        ApplicationBuilder.setErrorHandler(application);

        return application;
    }

    private static createApplicationInstance(): Application {
        logger.info('Creating express instance...');
        const application: Application = express();
        application.use(express.json());
        return application;
    }
}

export default ApplicationBuilder;