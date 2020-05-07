import {ShortenedNotExistsError} from "../../src/error/ShortenedNotExistsError";
import {ShortenerControllerError} from "../../src/error/ShortenerControllerError";

describe('ShortenerControllerError', () => {

    it('deve retornar uma instância de ShortenerControllerError', () => {

        const message = 'error!';
        const status = 409;

        const error = new ShortenerControllerError(message, status);

        expect(error.message).toBe(message);
        expect(error.status).toBe(status);
    });

});