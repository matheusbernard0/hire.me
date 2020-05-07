import {ShortenedAlreadyExistsError} from "../../src/error/ShortenedAlreadyExistsError";

describe('ShortenedAlreadyExistsError', () => {
    it('deve retornar uma instância de ShortenedAlreadyExistsError', () => {

        const message = 'error!';
        const status = 409;
        const data =  {
            alias: 'alias',
            err_code: 'error_code',
            description: 'description',
        }

        const error = new ShortenedAlreadyExistsError(message, status, data);

        expect(error.data).toBe(data);
        expect(error.message).toBe(message);
        expect(error.status).toBe(status);
    });
});