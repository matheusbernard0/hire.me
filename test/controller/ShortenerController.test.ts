import {ShortenerController} from "../../src/controller/ShortenerController";
import {ShortenerService} from "../../src/service/ShortenerService";
import {ShortenerRepository} from "../../src/repository/ShortenerRepository";
import {Request} from "jest-express/lib/request";
import {Request as ExpressRequest, Response as ExpressResponse } from "express";
import {Response} from "jest-express/lib/response";
import {FindMostVisitedResponseInterface} from "../../src/interface/dto/FindMostVisitedResponseInterface";
import logger from "../../src/log/ShortenerLogger";



jest.mock("../../src/service/ShortenerService");
jest.mock("../../src/repository/ShortenerRepository");
jest.mock("../../src/log/ShortenerLogger");

describe('ShortenerController', () => {

    describe('create', () => {

        it('caso url não seja do tipo \'string\', deve lançar uma exceção', async () => {
                const shortenerController = new ShortenerController(new ShortenerService(new ShortenerRepository(), logger));

                const mockedRequest = new Request() as unknown as ExpressRequest;
                const mockedResponse = new Response() as unknown as ExpressResponse;

                await expect(shortenerController.create(mockedRequest, mockedResponse)).rejects.toThrowError('url must be informed');
        });

        it('caso a url não seja http e nem https, deve jogar uma exceção', async () => {
            const shortenerController = new ShortenerController(new ShortenerService(new ShortenerRepository(), logger));

            const mockedRequest = new Request() as unknown as ExpressRequest;
            const mockedResponse = new Response() as unknown as ExpressResponse;

            mockedRequest.query.url = 'url'

            await expect(shortenerController.create(mockedRequest, mockedResponse)).rejects.toThrowError('a url informada deve seguir o padrão do protocolo http/https');
        })

        it('caso a requisição contenha url e seja http, deve retornar ' +
            'o resultado de shortenerService.create e com status 201', async () => {
            // mocks
            const mockedRepository =  new ShortenerRepository();
            const mockedService = new ShortenerService(mockedRepository, logger);
            const mockedRequest = new Request() as unknown as ExpressRequest;
            const mockedResponse = new Response() as unknown as ExpressResponse;

            // expectedValues
            const shortenerServiceCreateResult = {
                alias: 'alias',
                url: 'url',
                statistics: null,
            };

            mockedRequest.query.CUSTOM_ALIAS = 'alias';
            mockedRequest.query.url = 'http://url';

            const expectedShortenerServiceCreateInput = {
                url: 'http://url',
                customAlias: 'alias',
            };

            mockedService.create = jest.fn(async () => {
                return shortenerServiceCreateResult;
            });

            const shortenerController = new ShortenerController(mockedService);

            // execution
            await expect(shortenerController.create(mockedRequest, mockedResponse)).resolves;
            expect(mockedService.create).toBeCalledWith(expectedShortenerServiceCreateInput);
            expect(mockedResponse.status).toBeCalledWith(201);
            expect(mockedResponse.json).toBeCalledWith(shortenerServiceCreateResult);
        });

        it('caso a requisição contenha url e seja https, deve retornar ' +
            'o resultado de shortenerService.create e com status 201', async () => {
            // mocks
            const mockedRepository =  new ShortenerRepository();
            const mockedService = new ShortenerService(mockedRepository, logger);
            const mockedRequest = new Request() as unknown as ExpressRequest;
            const mockedResponse = new Response() as unknown as ExpressResponse;

            // expectedValues
            const shortenerServiceCreateResult = {
                alias: 'alias',
                url: 'url',
                statistics: null,
            };

            mockedRequest.query.CUSTOM_ALIAS = 'alias';
            mockedRequest.query.url = 'https://url';

            const expectedShortenerServiceCreateInput = {
                url: 'https://url',
                customAlias: 'alias',
            };

            mockedService.create = jest.fn(async () => {
                return shortenerServiceCreateResult;
            });

            const shortenerController = new ShortenerController(mockedService);

            // execution
            await expect(shortenerController.create(mockedRequest, mockedResponse)).resolves;
            expect(mockedService.create).toBeCalledWith(expectedShortenerServiceCreateInput);
            expect(mockedResponse.status).toBeCalledWith(201);
            expect(mockedResponse.json).toBeCalledWith(shortenerServiceCreateResult);
        });

        it('caso a requisição contenha url e customAlias setados, deve retornar ' +
            'o resultado de shortenerService.create e com status 201', async () => {
            // mocks
            const mockedRepository =  new ShortenerRepository();
            const mockedService = new ShortenerService(mockedRepository, logger);
            const mockedRequest = new Request() as unknown as ExpressRequest;
            const mockedResponse = new Response() as unknown as ExpressResponse;

            // expectedValues
            const shortenerServiceCreateResult = {
                alias: 'alias',
                url: 'url',
                statistics: null,
            };

            mockedRequest.query.CUSTOM_ALIAS = 'alias';
            mockedRequest.query.url = 'http://url';

            const expectedShortenerServiceCreateInput = {
                url: 'http://url',
                customAlias: 'alias',
            };

            mockedService.create = jest.fn(async () => {
                return shortenerServiceCreateResult;
            });

            const shortenerController = new ShortenerController(mockedService);

            // execution
            await expect(shortenerController.create(mockedRequest, mockedResponse)).resolves;
            expect(mockedService.create).toBeCalledWith(expectedShortenerServiceCreateInput);
            expect(mockedResponse.status).toBeCalledWith(201);
            expect(mockedResponse.json).toBeCalledWith(shortenerServiceCreateResult);
        });

        it('caso a requisição contenha apenas a url setada, deve retornar ' +
            'o resultado de shortenerService.create e com status 201', async () => {
            // mocks
            const mockedRepository =  new ShortenerRepository();
            const mockedService = new ShortenerService(mockedRepository, logger);
            const mockedRequest = new Request() as unknown as ExpressRequest;
            const mockedResponse = new Response() as unknown as ExpressResponse;

            // expectedValues
            const expectedShortenerServiceCreateResult = {
                alias: 'alias',
                url: 'http://url',
                statistics: null,
            };

            const expectedShortenerServiceCreateInput = {
                url: 'http://url',
                customAlias: null,
            };

            mockedService.create = jest.fn(async () => {
                return expectedShortenerServiceCreateResult;
            });

            const shortenerController = new ShortenerController(mockedService);

            mockedRequest.query.CUSTOM_ALIAS = undefined;
            mockedRequest.query.url = 'http://url';

            // execution
            await expect(shortenerController.create(mockedRequest, mockedResponse)).resolves;
            expect(mockedService.create).toBeCalledWith(expectedShortenerServiceCreateInput);
            expect(mockedResponse.status).toBeCalledWith(201);
            expect(mockedResponse.json).toBeCalledWith(expectedShortenerServiceCreateResult);
        });
    });

    describe('retrieve', () => {

        it('caso alias não seja do tipo \'string\', deve lançar uma exceção', async () => {
            const shortenerController = new ShortenerController(new ShortenerService(new ShortenerRepository(), logger));

            const mockedRequest = new Request() as unknown as ExpressRequest;
            const mockedResponse = new Response() as unknown as ExpressResponse;

            await expect(shortenerController.retrieve(mockedRequest, mockedResponse)).rejects.toThrowError('alias must be informed');
        });

        it('caso alias tenha sido informado, deve redirecionar para a url original', async () => {
            // mocks
            const mockedRepository =  new ShortenerRepository();
            const mockedService = new ShortenerService(mockedRepository, logger);
            const mockedRequest = new Request() as unknown as ExpressRequest;
            const mockedResponse = new Response() as unknown as ExpressResponse;

            // expected values
            const expectShortenerServiceInput = {
                alias: 'alias',
            };
            const expectShortenerServiceResult = {
                url: 'url',
                alias: 'alias',
            };

            mockedService.retrieve = jest.fn(async () => {
                return expectShortenerServiceResult;
            });

            mockedRequest.params.alias = 'alias';

            const shortenerController = new ShortenerController(mockedService);

            await expect(shortenerController.retrieve(mockedRequest, mockedResponse)).resolves;
            expect(mockedService.retrieve).toBeCalledWith(expectShortenerServiceInput);
            expect(mockedResponse.redirect).toBeCalledWith(expectShortenerServiceResult.url);
        });
    });

    describe('findMostVisiteds', () => {
        it('caso quantity não tenha sido setado, deve lançar uma exceção', async () => {
            // mocks
            const mockedRepository =  new ShortenerRepository();
            const mockedService = new ShortenerService(mockedRepository, logger);
            const mockedRequest = new Request() as unknown as ExpressRequest;
            const mockedResponse = new Response() as unknown as ExpressResponse;

            const shortenerController = new ShortenerController(mockedService);

            mockedRequest.params.quantity = null;

            await expect(shortenerController.mostVisiteds(mockedRequest, mockedResponse)).rejects.toThrowError('quantity must be informed');
        });

        it('caso quantity não seja numérico, deve lançar uma exceção', async () => {
            // mocks
            const mockedRepository =  new ShortenerRepository();
            const mockedService = new ShortenerService(mockedRepository, logger);
            const mockedRequest = new Request() as unknown as ExpressRequest;
            const mockedResponse = new Response() as unknown as ExpressResponse;

            const shortenerController = new ShortenerController(mockedService);

            mockedRequest.params.quantity = "12something";

            await expect(shortenerController.mostVisiteds(mockedRequest, mockedResponse)).rejects.toThrowError('quantity must be a number');
        });

        it('caso quantity tenha sido setado corretamente, deve retornar ' +
            'o resultado deo shortenerService.findMostVisiteds', async () => {
            // mocks
            const mockedRepository =  new ShortenerRepository();
            const mockedService = new ShortenerService(mockedRepository, logger);
            const mockedRequest = new Request() as unknown as ExpressRequest;
            const mockedResponse = new Response() as unknown as ExpressResponse;


            // expected values
            const expectedShortenerServiceFindMostVisitedsInput = {
                quantity: 1,
            };

            const expectedShortenerServiceFindMostVisitedsResult = {
                mostVisiteds: [
                    {
                        visits: 10,
                        alias: 'alias',
                        url: 'url',
                    },
                ],
            };

            mockedService.findMostVisiteds = jest.fn(async (): Promise<FindMostVisitedResponseInterface> => {
                return expectedShortenerServiceFindMostVisitedsResult;
            });

            const shortenerController = new ShortenerController(mockedService);

            mockedRequest.params.quantity = '1';

            await expect(shortenerController.mostVisiteds(mockedRequest, mockedResponse)).resolves;
            expect(mockedService.findMostVisiteds).toBeCalledWith(expectedShortenerServiceFindMostVisitedsInput);
            expect(mockedResponse.status).toBeCalledWith(200);
            expect(mockedResponse.json).toBeCalledWith(expectedShortenerServiceFindMostVisitedsResult);
        });
    });
});
