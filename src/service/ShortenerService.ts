import shortid from 'shortid';

import {ShortenerServiceInterface} from '../interface/service/ShortenerServiceInterface';
import {ShortenerRepositoryInterface} from '../interface/repository/ShortenerRepositoryInterface';
import {ShortenerCreateRequestInterface} from '../interface/dto/ShortenerCreateRequestInterface';
import {ShortenerRetrieveRequestInterface} from '../interface/dto/ShortenerRetrieveRequestInterface';
import {FindMostVisitedRequestInterface} from '../interface/dto/FindMostVisitedRequestInterface';
import {ShortenerCreateResponseInterface} from '../interface/dto/ShortenerCreateResponseInterface';
import {ShortenerRetrieveResponseInterface} from '../interface/dto/ShortenerRetrieveResponseInterface';
import {ShortenedURL} from '../model/ShortenedURL';
import {ShortenerValidator} from '../util/ShortenerValidator';
import {FindMostVisitedResponseInterface} from '../interface/dto/FindMostVisitedResponseInterface';
import {VisitedInterface} from '../interface/dto/VisitedInterface';
import {ShortenedNotExistsError} from '../error/ShortenedNotExistsError';
import {ShortenedAlreadyExistsError} from '../error/ShortenedAlreadyExistsError';
import {AlreadyExistsDataInterface} from '../interface/error/AlreadyExistsDataInterface';
import {NotExistsDataInterface} from '../interface/error/NotExistsDataInterface';

export class ShortenerService implements ShortenerServiceInterface{

    constructor(private repository: ShortenerRepositoryInterface) {}

    public create = async (createRequest: ShortenerCreateRequestInterface): Promise<ShortenerCreateResponseInterface> =>  {
        ShortenerValidator.validateCreateRequest(createRequest);

        const { customAlias, url } = createRequest;

        // caso custom alias não tenha sido informado, deve criar uma url encurtada com shortid.
        if (!customAlias) {
            const alias = shortid.generate();

            const created = await this.repository.save(this.newShortenedUrlObject(url, alias, 0));

            return this.convertFromShortenedURLToCreateResponse(created);
        }

        const shortenedURL = await this.repository.findByAlias(customAlias);

        if (shortenedURL) {

            const data: AlreadyExistsDataInterface = {
                alias: customAlias,
                err_code: '001',
                description: 'CUSTOM ALIAS ALREADY EXISTS',
            };

            throw new ShortenedAlreadyExistsError('Já existe url cadastrada para o shortUrl informado!', 409, data);
        }

        const created = await this.repository.save(this.newShortenedUrlObject(url, customAlias, 0));

        return this.convertFromShortenedURLToCreateResponse(created);
    };

    public retrieve = async (retrieveShortened: ShortenerRetrieveRequestInterface): Promise<ShortenerRetrieveResponseInterface> => {

        ShortenerValidator.validateRetrieveRequest(retrieveShortened);

        const { alias } = retrieveShortened;

        const shortenedURL = await this.repository.findByAlias(alias);

        if (!shortenedURL) {
            const data: NotExistsDataInterface = {
                err_code: '002',
                description: 'SHORTENED URL NOT FOUND',
            }
            throw new ShortenedNotExistsError('url não encontrada!', 404, data);
        }

        shortenedURL.visits += 1;

        const shortenedURLIncreased = await this.repository.update(shortenedURL);

        return this.convertFromShortenedURLToRetrieveResponse(shortenedURLIncreased);
    }

    public findMostVisiteds = async (findModeVisitedRequest: FindMostVisitedRequestInterface): Promise<FindMostVisitedResponseInterface> => {

        ShortenerValidator.validateFindMoreVisitedRequest(findModeVisitedRequest);

        const { quantity } = findModeVisitedRequest;

        const shortenedURLs = await this.repository.findMostVisiteds(quantity)

        return {
            mostVisiteds: this.convertFromShortenedURLToFindMostVisitedsResponse(shortenedURLs),
        } ;
    }

    private newShortenedUrlObject = (url: string, alias: string, visits: number): ShortenedURL => {
        let shortenedURL: ShortenedURL = new ShortenedURL();
        shortenedURL.url = url;
        shortenedURL.alias = alias;
        shortenedURL.visits = visits;

        return shortenedURL
    }

    private convertFromShortenedURLToCreateResponse = (created: ShortenedURL): ShortenerCreateResponseInterface => {
        return {
            alias: created.alias,
            url: created.url,
            statistics: null,
        }
    }

    private convertFromShortenedURLToRetrieveResponse = (shortenedURL: ShortenedURL): ShortenerRetrieveResponseInterface => {
        return {
            url: shortenedURL.url,
            alias: shortenedURL.alias,
        };
    }

    private convertFromShortenedURLToFindMostVisitedsResponse = (shortenedURLs: ShortenedURL[]): VisitedInterface[] => {
        return shortenedURLs.map((shortened): VisitedInterface => {
            return {
                url: shortened.url,
                alias: shortened.alias,
                visits: shortened.visits,
            }
        });
    }

}
