import shortenerErrorHandler from '../../../src/error/handler/shortenerErrorHandler';
import { ShortenerControllerError } from "../../../src/error/ShortenerControllerError";
import { ShortenedNotExistsError } from "../../../src/error/ShortenedNotExistsError";
import { ShortenedAlreadyExistsError } from "../../../src/error/ShortenedAlreadyExistsError";
import { Response } from "jest-express/lib/response";

jest.mock('../../../src/log/ShortenerLogger');

describe('shortenerErrorHandler', () => {

    it('caso o erro seja instância de ShortenerControllerError, deve retornar o status e a mensagem do erro', () => {
        const resStub =  new Response();

        const req = {};
        const err = new ShortenerControllerError('deu ruim', 400);
        const next = {};

        shortenerErrorHandler(err, req, resStub, next);

        expect(resStub.json).toBeCalledWith({message: 'deu ruim'});
        expect(resStub.status).toBeCalledWith(400);

    });

    it('caso o erro seja instância de ShortenedNotExistsError, deve retornar o status e o data do erro', () => {
        const resStub =  new Response();

        const req = {};

        const data = { err_code: 'error_code', description: 'description'};
        const err = new ShortenedNotExistsError('deu ruim', 400, data);

        const next = {};

        shortenerErrorHandler(err, req, resStub, next);

        expect(resStub.json).toBeCalledWith(data);
        expect(resStub.status).toBeCalledWith(400);
    });

    it('caso o erro seja instância de ShortenedAlreadyExistsError, deve retornar o status e o data do erro', () => {
        const resStub =  new Response();

        const req = {};

        const data = { alias: 'alias', err_code: 'error_code', description: 'description'};
        const err = new ShortenedAlreadyExistsError('deu ruim', 400, data);

        const next = {};

        shortenerErrorHandler(err, req, resStub, next);

        expect(resStub.json).toBeCalledWith(data);
        expect(resStub.status).toBeCalledWith(400);
    });

    it('caso o erro seja um erro não mapeado no errorHandler deve retornar status 500 e uma mensagem de erro interno', () => {
        const resStub =  new Response();

        const req = {};
        const err = new Error('deu ruim');
        const next = {};

        shortenerErrorHandler(err, req, resStub, next);

        expect(resStub.json).toBeCalledWith({
            message: 'Internal server error!',
        });
        expect(resStub.status).toBeCalledWith(500);
    });
})