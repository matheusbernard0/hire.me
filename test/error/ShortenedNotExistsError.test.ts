import {ShortenedNotExistsError} from "../../src/error/ShortenedNotExistsError";

describe('ShortenedNotExistsError', () => {
    it('deve retornar uma instância de ShortenedNotExistsError', () => {

        const message = 'error!';
        const status = 409;
        const data =  {
            err_code: 'error_code',
            description: 'description',
        }

        const error = new ShortenedNotExistsError(message, status, data);

        expect(error.data).toBe(data);
        expect(error.message).toBe(message);
        expect(error.status).toBe(status);
    });
});