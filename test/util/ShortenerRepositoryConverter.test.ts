import {ShortenerRepositoryConverter} from "../../src/util/ShortenerRepositoryConverter";
import {ShortenedURLEntity} from "../../src/entity/ShortenedURLEntity";
import {ShortenedURL} from "../../src/model/ShortenedURL";

describe('ShortenerRepositoryConverter', () => {
    describe('fromEntityToModel', () => {
        it('caso o entity informado seja nulo, deve retornar null', () => {
            expect(ShortenerRepositoryConverter.fromEntityToModel(null)).toBeNull();
        });

        it('deve retornar uma instância de ShortenedURL', () => {
            const entity = new ShortenedURLEntity();
            entity.id = 10;
            entity.url = 'url';
            entity.alias = 'alias';
            entity.shortenedurl = 'shortenedurl';
            entity.visits = 100;

            const model = ShortenerRepositoryConverter.fromEntityToModel(entity);

            expect(model).toBeInstanceOf(ShortenedURL);
            expect(model.getId()).toBe(10);
            expect(model.getUrl()).toBe('url');
            expect(model.getAlias()).toBe('alias');
            expect(model.getShortenedurl()).toBe('shortenedurl');
            expect(model.getVisits()).toBe(100);
        });
    });

    describe('fromModelToEntity', () => {
        it('caso o model informado seja nulo, deve retornar null', () => {
            expect(ShortenerRepositoryConverter.fromModelToEntity(null)).toBeNull();
        });

        it('deve retornar uma instância de ShortenedURL', () => {
            const model = new ShortenedURL(10, 'url', 'alias', 'shortenedurl', 100);

            const entity = ShortenerRepositoryConverter.fromModelToEntity(model);

            expect(entity).toBeInstanceOf(ShortenedURLEntity);
            expect(entity.id).toBe(10);
            expect(entity.url).toBe('url');
            expect(entity.alias).toBe('alias');
            expect(entity.shortenedurl).toBe('shortenedurl');
            expect(entity.visits).toBe(100);
        });
    });
});