import {ShortenedURLEntity} from "../entity/ShortenedURLEntity";
import {ShortenedURL} from "../model/ShortenedURL";

export class ShortenerRepositoryConverter {
    public static fromEntityToModel(entity: ShortenedURLEntity): ShortenedURL {
        if(!entity) return null;

        const {id, url, alias, shortenedurl, visits} = entity

        return new ShortenedURL(id, url, alias, shortenedurl, visits);
    }

    public static fromModelToEntity(model: ShortenedURL): ShortenedURLEntity{
        if(!model) return null;

        const entity = new ShortenedURLEntity();

        entity.id = model.getId();
        entity.url = model.getUrl();
        entity.alias = model.getAlias();
        entity.visits = model.getVisits();
        entity.shortenedurl = model.getShortenedurl();

        return entity;
    }
}