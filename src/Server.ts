import 'reflect-metadata';
import ApplicationBuilder from './ApplicationBuilder';
import {EnvironmentConfigurer} from './config/EnvironmentConfigurer';
import logger from './log/ShortenerLogger';

(async () => {

    //Configura todas as variáveis de ambiente
    logger.info('Configuring environment variables ...');
    EnvironmentConfigurer.configure();


    const {APP_PORT} = process.env;

    logger.info('Building aplication ...');
    const app = await ApplicationBuilder.build();

    app.listen(APP_PORT,  () => {
        console.log(`Server running at port ${APP_PORT}` );
    });

})();

