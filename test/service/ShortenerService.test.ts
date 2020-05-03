import {ShortenerService} from '../../src/service/ShortenerService';
import {ShortenerRepository} from '../../src/repository/ShortenerRepository';
import {ShortenerCreateRequestInterface} from '../../src/interface/dto/ShortenerCreateRequestInterface';
import shortid from 'shortid';
import {ShortenedURL} from "../../src/model/ShortenedURL";
import {ShortenerCreateResponseInterface} from "../../src/interface/dto/ShortenerCreateResponseInterface";
import {ShortenedAlreadyExistsError} from "../../src/error/ShortenedAlreadyExistsError";
import {ShortenerRetrieveRequestInterface} from "../../src/interface/dto/ShortenerRetrieveRequestInterface";
import {ShortenerRetrieveResponseInterface} from "../../src/interface/dto/ShortenerRetrieveResponseInterface";
import {FindMostVisitedRequestInterface} from "../../src/interface/dto/FindMostVisitedRequestInterface";
import {FindMostVisitedResponseInterface} from "../../src/interface/dto/FindMostVisitedResponseInterface";
import mock = jest.mock;


jest.mock('../../src/repository/ShortenerRepository');
jest.mock('shortid');

describe('ShortenerService', () => {

    describe('create', () =>{

        it('caso createRequest seja falsy, deve lançar exceção', async function () {
            const shortenerService = new ShortenerService(new ShortenerRepository());

            const createRequest = null;

            await expect(shortenerService.create(createRequest)).rejects.toThrowError('createRequest deve ser informado!');
        });

        it('caso createRequest não seja um objeto, deve lançar exceção', async function () {
            const shortenerService = new ShortenerService(new ShortenerRepository());

            const createRequest = [] as unknown as ShortenerCreateRequestInterface;

            await expect(shortenerService.create(createRequest)).rejects.toThrowError('createRequest deve ser um objeto!');
        });

        it('caso createRequest não possua o atributo url do tipo string, deve lançar exceção', async function () {
            const shortenerService = new ShortenerService(new ShortenerRepository());

            const createRequest = {} as unknown as ShortenerCreateRequestInterface;

            await expect(shortenerService.create(createRequest)).rejects.toThrowError('createRequest.url deve ser do tipo string!');
        });

        it('caso CUSTOM_ALIAS não tenha sido informado, deve criar uma url encurtada usando o shortid', async () => {
            const createRequest: ShortenerCreateRequestInterface = {
                url: 'some_url'
            };

            const expectedResult: ShortenerCreateResponseInterface = {
                statistics: null,
                url: 'some_url',
                alias: 'some_alias'
            };

            const shortenedURLToBeSaved = aShortenedUrl(createRequest.url, 'some_alias', 0);

            shortid.generate = jest.fn(() => {
                return 'some_alias';
            });

            const mockedRepository = new ShortenerRepository();
            mockedRepository.save = jest.fn(async (shortenedURL): Promise<ShortenedURL> => {
                return {
                    ...shortenedURL,
                    id: 1,
                }
            });

            const shortenerService = new ShortenerService(mockedRepository);

            await expect(shortenerService.create(createRequest)).resolves.toStrictEqual(expectedResult);
            expect(shortid.generate).toBeCalled();
            expect(mockedRepository.save).toBeCalledWith(shortenedURLToBeSaved);
        });

        describe('caso CUSTOM_ALIAS tenha sido informado',  () => {
            it('se já existe no banco, deve retornar um erro', async () => {
                const createRequest: ShortenerCreateRequestInterface = {
                    url: 'some_url',
                    customAlias: 'some_alias',
                };

                const alreadyExistsData = {
                    alias: 'some_alias',
                        err_code: '001',
                        description: 'CUSTOM ALIAS ALREADY EXISTS',
                }
                const err = new ShortenedAlreadyExistsError('Já existe url cadastrada para o shortUrl informado!', 408, alreadyExistsData);

                shortid.generate = jest.fn(() => {
                    return 'some_alias';
                });

                const mockedRepository = new ShortenerRepository();
                mockedRepository.save = jest.fn(async (shortenedURL): Promise<ShortenedURL> => {
                    return {
                        ...shortenedURL,
                        id: 1,
                    }
                });

                mockedRepository.findByAlias = jest.fn(async (alias: string): Promise<ShortenedURL> => {
                    const shortenedURL = new ShortenedURL();
                    shortenedURL.alias = alias;
                    return shortenedURL;
                });

                const shortenerService = new ShortenerService(mockedRepository);

                await expect(shortenerService.create(createRequest)).rejects.toThrowError('Já existe url cadastrada para o shortUrl informado!');
                expect(shortid.generate).not.toBeCalled();
                expect(mockedRepository.findByAlias).toBeCalledWith(createRequest.customAlias);
                expect(mockedRepository.save).not.toBeCalled();
            });

            it('se não existe, deve salvar url com custom_alias', async () => {
                const createRequest: ShortenerCreateRequestInterface = {
                    url: 'some_url',
                    customAlias: 'some_alias',
                };

                const expectedResult: ShortenerCreateResponseInterface = {
                    alias: createRequest.customAlias,
                    url: createRequest.url,
                    statistics: null,
                };

                const shortenedURLToBeSaved = aShortenedUrl(createRequest.url, createRequest.customAlias,0)

                shortid.generate = jest.fn(() => {
                    return 'some_alias';
                });

                const mockedRepository = new ShortenerRepository();
                mockedRepository.save = jest.fn(async (shortenedURL): Promise<ShortenedURL> => {
                    return {
                        ...shortenedURL,
                        id: 1,
                    }
                });

                mockedRepository.findByAlias = jest.fn(async (alias: string): Promise<ShortenedURL> => {
                    return null;
                });

                const shortenerService = new ShortenerService(mockedRepository);

                await expect(shortenerService.create(createRequest)).resolves.toStrictEqual(expectedResult);
                expect(shortid.generate).not.toBeCalled();
                expect(mockedRepository.findByAlias).toBeCalledWith(createRequest.customAlias);
                expect(mockedRepository.save).toBeCalledWith(shortenedURLToBeSaved);
            });
        });

    });

    describe('retrieve', () =>{

        it('caso retrieveRequest seja falsy, deve lançar exceção', async function () {
            const shortenerService = new ShortenerService(new ShortenerRepository());

            const retrieveRequest = null;

            await expect(shortenerService.retrieve(retrieveRequest)).rejects.toThrowError('retrieveRequest deve ser informado!');
        });

        it('caso retrieveRequest não seja um objeto, deve lançar exceção', async function () {
            const shortenerService = new ShortenerService(new ShortenerRepository());

            const retrieveRequest = [] as unknown as ShortenerRetrieveRequestInterface;

            await expect(shortenerService.retrieve(retrieveRequest)).rejects.toThrowError('retrieveRequest deve ser um objeto!');
        });

        it('caso retrieveRequest não possua o atributo alias do tipo string, deve lançar exceção', async function () {
            const shortenerService = new ShortenerService(new ShortenerRepository());

            const retrieveRequest = {} as unknown as ShortenerRetrieveRequestInterface;

            await expect(shortenerService.retrieve(retrieveRequest)).rejects.toThrowError('retrieveRequest.alias deve ser do tipo string!');
        });

        it('caso a url não exista, deve lançar exceção', async () => {
            const retrieveRequest: ShortenerRetrieveRequestInterface = {
                alias: 'some_alias',
            }

            const mockedRepository = new ShortenerRepository();
            mockedRepository.findByAlias = jest.fn((alias: string): Promise<ShortenedURL> => {
                return null;
            });

            const shortenerService = new ShortenerService(mockedRepository);

            await expect(shortenerService.retrieve(retrieveRequest)).rejects.toThrowError('url não encontrada!');
            expect(mockedRepository.findByAlias).toBeCalledWith(retrieveRequest.alias);
        });

        it('caso a url exista, deve retornar a mesma e incrementar o número de visitas', async () => {
            const retrieveRequest: ShortenerRetrieveRequestInterface = {
                alias: 'some_alias',
            }

            const expectedResult: ShortenerRetrieveResponseInterface = {
                alias: retrieveRequest.alias,
                url: 'some_url',
            }

            const shortenedURL = aShortenedUrl('some_url', retrieveRequest.alias, 0);

            const mockedRepository = new ShortenerRepository();
            mockedRepository.findByAlias = jest.fn(async (alias: string): Promise<ShortenedURL> => {
                return {
                    ...shortenedURL,
                }
            });
            mockedRepository.update = jest.fn(async (shortenedUrl: ShortenedURL): Promise<ShortenedURL> => {
                return shortenedUrl;
            });

            const shortenerService = new ShortenerService(mockedRepository);

            await expect(shortenerService.retrieve(retrieveRequest)).resolves.toStrictEqual(expectedResult);
            expect(mockedRepository.findByAlias).toBeCalledWith(retrieveRequest.alias);

            shortenedURL.visits += 1;
            expect(mockedRepository.update).toBeCalledWith(shortenedURL);
        });
    });

    describe('findMostVisiteds', () =>{
        it('caso findMostVisitedsRequest seja falsy, deve lançar exceção', async function () {
            const shortenerService = new ShortenerService(new ShortenerRepository());

            const findMostVisitedRequest = null;

            await expect(shortenerService.findMostVisiteds(findMostVisitedRequest)).rejects.toThrowError('findMostVisitedsRequest deve ser informado!');
        });

        it('caso findMostVisitedRequest não seja um objeto, deve lançar exceção', async function () {
            const shortenerService = new ShortenerService(new ShortenerRepository());

            const findMostVisitedRequest = [] as unknown as FindMostVisitedRequestInterface;

            await expect(shortenerService.findMostVisiteds(findMostVisitedRequest)).rejects.toThrowError('findMostVisitedsRequest deve ser um objeto!');
        });

        it('caso findMostVisitedRequest não possua o atributo quantity do tipo number, deve lançar exceção', async function () {
            const findMostVisitedRequestInterface = {} as unknown as FindMostVisitedRequestInterface;

            const shortenerService = new ShortenerService(new ShortenerRepository());

            const findMostVisitedRequest = {} as unknown as FindMostVisitedRequestInterface;

            await expect(shortenerService.findMostVisiteds(findMostVisitedRequest)).rejects.toThrowError('findMostVisitedsRequest.quantity deve ser do tipo number!');
        });

        it('deve retornar a top list do banco', async function () {

            const findMostVisitedRequest: FindMostVisitedRequestInterface = {
                quantity: 3
            }

            const aShortenedUrlArray = [
                aShortenedUrl('url1', 'alias1', 7),
                aShortenedUrl('url2', 'alias2', 6),
                aShortenedUrl('url3', 'alias3', 8),
            ];

            const expectedResult: FindMostVisitedResponseInterface = {
                mostVisiteds: [
                    { url: 'url1', alias: 'alias1', visits: 7 },
                    { url: 'url2', alias: 'alias2', visits: 6 },
                    { url: 'url3', alias: 'alias3', visits: 8},
                ],
            }

            const mockedRepository = new ShortenerRepository();
            mockedRepository.findMostVisiteds = jest.fn(async (quantity: number): Promise<ShortenedURL[]> => {
                return aShortenedUrlArray;
            });

            const shortenerService = new ShortenerService(mockedRepository);

            await expect(shortenerService.findMostVisiteds(findMostVisitedRequest)).resolves.toStrictEqual(expectedResult);
            expect(mockedRepository.findMostVisiteds).toBeCalledWith(findMostVisitedRequest.quantity);
        });
    });
});

function aShortenedUrl(url, alias, visits) {
    const shortenedURLToBeSaved = new ShortenedURL();
    shortenedURLToBeSaved.alias = alias;
    shortenedURLToBeSaved.url = url;
    shortenedURLToBeSaved.visits = visits;
    return shortenedURLToBeSaved;
}