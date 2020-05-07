import {ShortenerServiceError} from "../../src/error/ShortenerServiceError";

describe('ShortenerServiceError', () => {

    it('deve retornar uma instância de ShortenerServiceError', () => {

        const message = 'error!';

        const error = new ShortenerServiceError(message);

        expect(error.message).toBe(message);
    });

});