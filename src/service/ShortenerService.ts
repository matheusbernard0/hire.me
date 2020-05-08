import shortid from 'shortid';

import {ShortenerServiceInterface} from '../interface/service/ShortenerServiceInterface';
import {ShortenerRepositoryInterface} from '../interface/repository/ShortenerRepositoryInterface';
import {ShortenerCreateRequestInterface} from '../interface/dto/ShortenerCreateRequestInterface';
import {ShortenerRetrieveRequestInterface} from '../interface/dto/ShortenerRetrieveRequestInterface';
import {FindMostVisitedRequestInterface} from '../interface/dto/FindMostVisitedRequestInterface';
import {ShortenerCreateResponseInterface} from '../interface/dto/ShortenerCreateResponseInterface';
import {ShortenerRetrieveResponseInterface} from '../interface/dto/ShortenerRetrieveResponseInterface';
import {ShortenedURLEntity} from '../entity/ShortenedURLEntity';
import {ShortenerValidator} from '../util/ShortenerValidator';
import {FindMostVisitedResponseInterface} from '../interface/dto/FindMostVisitedResponseInterface';
import {VisitedInterface} from '../interface/dto/VisitedInterface';
import {ShortenedNotExistsError} from '../error/ShortenedNotExistsError';
import {ShortenedAlreadyExistsError} from '../error/ShortenedAlreadyExistsError';
import {AlreadyExistsDataInterface} from '../interface/error/AlreadyExistsDataInterface';
import {NotExistsDataInterface} from '../interface/error/NotExistsDataInterface';
import {ShortenedURL} from "../model/ShortenedURL";
import {ShortenerLoggerInterface} from "../interface/log/ShortenerLoggerInterface";

export class ShortenerService implements ShortenerServiceInterface{

    private readonly baseaUrl: string = `http://${process.env.APP_HOST}:${process.env.APP_PORT}`;

    constructor(private repository: ShortenerRepositoryInterface, private logger: ShortenerLoggerInterface) {}

    public create = async (createRequest: ShortenerCreateRequestInterface): Promise<ShortenerCreateResponseInterface> => {
        const startTime = Date.now();

        ShortenerValidator.validateCreateRequest(createRequest);

        const { customAlias, url } = createRequest;

        if (!customAlias) {
            const alias = shortid.generate();

            this.logger.info(`Saving ${url} in database...`);
            const created = await this.repository.save(new ShortenedURL(null, url, alias, this.generateShortenedurlString(alias), 0));
            this.logger.info('Saved successfuly!');

            return this.convertFromShortenedURLToCreateResponse(created, startTime, Date.now());
        }

        const shortenedURL = await this.repository.findByAlias(customAlias);

        if (shortenedURL) {

            this.logger.warn('Alias already exists in database!');

            const data: AlreadyExistsDataInterface = {
                alias: customAlias,
                err_code: '001',
                description: 'CUSTOM ALIAS ALREADY EXISTS',
            };

            throw new ShortenedAlreadyExistsError('Já existe url cadastrada para o shortUrl informado!', 409, data);
        }

        this.logger.info(`Saving ${url} in database...`);
        const created = await this.repository.save(new ShortenedURL(null, url, customAlias, this.generateShortenedurlString(customAlias), 0));
        this.logger.info('Saved successfuly!');

        return this.convertFromShortenedURLToCreateResponse(created, startTime, Date.now());
    };

    public retrieve = async (retrieveShortened: ShortenerRetrieveRequestInterface): Promise<ShortenerRetrieveResponseInterface> => {

        ShortenerValidator.validateRetrieveRequest(retrieveShortened);

        const { alias } = retrieveShortened;

        this.logger.info(`Retreving shortened with alias ${alias}`)
        const shortenedURL = await this.repository.findByAlias(alias);

        if (!shortenedURL) {
            this.logger.warn('Shortened url with informed alias not exists in database');

            const data: NotExistsDataInterface = {
                err_code: '002',
                description: 'SHORTENED URL NOT FOUND',
            }
            throw new ShortenedNotExistsError('url não encontrada!', 404, data);
        }


        shortenedURL.increaseVisits();

        this.logger.info('Updating shortened url to increase visits');
        const shortenedURLIncreased = await this.repository.update(shortenedURL);

        return this.convertFromShortenedURLToRetrieveResponse(shortenedURLIncreased);
    }

    public findMostVisiteds = async (findModeVisitedRequest: FindMostVisitedRequestInterface): Promise<FindMostVisitedResponseInterface> => {

        ShortenerValidator.validateFindMoreVisitedRequest(findModeVisitedRequest);

        const { quantity } = findModeVisitedRequest;

        this.logger.info('Retrieving most visiteds from database.');
        const shortenedURLs = await this.repository.findMostVisiteds(quantity)

        return {
            mostVisiteds: this.convertFromShortenedURLToFindMostVisitedsResponse(shortenedURLs),
        } ;
    }

    private convertFromShortenedURLToCreateResponse = (created: ShortenedURL, startTime, finalTime): ShortenerCreateResponseInterface => {
        return {
            alias: created.getAlias(),
            url: created.getShortenedurl(),
            statistics: {
                time_taken: `${finalTime - startTime}ms`
            },
        }
    }

    private convertFromShortenedURLToRetrieveResponse = (shortenedURL: ShortenedURL): ShortenerRetrieveResponseInterface => {
        return {
            url: shortenedURL.getUrl(),
            alias: shortenedURL.getAlias(),
        };
    }

    private convertFromShortenedURLToFindMostVisitedsResponse = (shortenedURLs: ShortenedURL[]): VisitedInterface[] => {
        return shortenedURLs.map((shortened): VisitedInterface => {
            return {
                url: shortened.getUrl(),
                alias: shortened.getAlias(),
                visits: shortened.getVisits(),
            }
        });
    }

    private generateShortenedurlString = (customAlias: string): string => {
        return this.baseaUrl.concat(`/shortener/${customAlias}`);
    }

}
