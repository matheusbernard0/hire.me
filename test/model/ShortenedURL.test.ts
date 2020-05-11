import {ShortenedURL} from "../../src/model/ShortenedURL";

describe('ShortenedURL', function () {
    describe('constructor', () => {
        it('caso id não seja nulo e não seja um number, deve lançar exceção', () => {
            const id: number = 'id' as unknown as number;

            const runner = () => {
                new ShortenedURL(id , 'url', 'alias', 'shortenedurl', 10);
            };

            expect(runner).toThrowError('id must be a number');
        });

        it('caso url não seja  uma string, deve lançar exceção', () => {
            const url: string = 12 as unknown as string;

            const runner = () => {
                new ShortenedURL(10 , url, 'alias', 'shortenedurl', 10);
            };

            expect(runner).toThrowError('url must be a string');
        });

        it('caso alias não seja uma string, deve lançar exceção', () => {
            const alias: string = 12 as unknown as string;

            const runner = () => {
                new ShortenedURL(10 , 'url', alias, 'shortenedurl', 10);
            };

            expect(runner).toThrowError('alias must be a string');
        });

        it('caso shortenedurl não seja uma string, deve lançar exceção', () => {
            const shortenedurl: string = 12 as unknown as string;

            const runner = () => {
                new ShortenedURL(10 , 'url', 'alias', shortenedurl, 10);
            };

            expect(runner).toThrowError('shortenedurl must be a string');
        });

        it('caso visits não seja um number, deve lançar exceção', () => {
            const visits: number = 'visits' as unknown as number;

            const runner = () => {
                new ShortenedURL(10 , 'url', 'alias', 'shortenedurl', visits);
            };

            expect(runner).toThrowError('visits must be a number');
        });
    });

    it('getId deve retornar o id setado na construção do objeto', () => {
        const shortenedURL = new ShortenedURL(10, 'url', 'alias', 'shortenedurl', 10);

        expect(shortenedURL.getId()).toBe(10);
    })

    it('getUrl deve retornar a url setado na construção do objeto', () => {
        const shortenedURL = new ShortenedURL(10, 'url', 'alias', 'shortenedurl', 10);

        expect(shortenedURL.getUrl()).toBe('url');
    })

    it('getAlias deve retornar o alias setado na construção do objeto', () => {
        const shortenedURL = new ShortenedURL(10, 'url', 'alias', 'shortenedurl', 10);

        expect(shortenedURL.getAlias()).toBe('alias');
    })

    it('getShortenedurl deve retornar o shortenedurl setado na construção do objeto', () => {
        const shortenedURL = new ShortenedURL(10, 'url', 'alias', 'shortenedurl', 10);

        expect(shortenedURL.getShortenedurl()).toBe('shortenedurl');
    })

    it('getVisits deve retornar o visits setado na construção do objeto', () => {
        const shortenedURL = new ShortenedURL(10, 'url', 'alias', 'shortenedurl', 10);

        expect(shortenedURL.getVisits()).toBe(10);
    })
});