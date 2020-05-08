import {ShortenerRepositoryInterface} from '../interface/repository/ShortenerRepositoryInterface';
import {ShortenedURLEntity} from "../entity/ShortenedURLEntity";
import { getRepository, Repository} from "typeorm";
import {ShortenedURL} from "../model/ShortenedURL";
import {ShortenerRepositoryConverter} from "../util/ShortenerRepositoryConverter";


export class ShortenerRepository implements ShortenerRepositoryInterface{
    private repository: Repository<ShortenedURLEntity>;

    constructor() {
        this.repository = getRepository(ShortenedURLEntity);
    }

    public save = async (shortenedURL: ShortenedURL): Promise<ShortenedURL> => {
        const shortenedURLEntity = ShortenerRepositoryConverter.fromModelToEntity(shortenedURL);

        const result = await this.repository.save(shortenedURLEntity);

        return ShortenerRepositoryConverter.fromEntityToModel(result);
    }

    public findByAlias = async (alias: string): Promise<ShortenedURL> => {
        const result = await this.repository
            .createQueryBuilder('shortened')
            .where('shortened.alias = :alias', { alias })
            .getOne();

        return ShortenerRepositoryConverter.fromEntityToModel(result);
    }

    public findMostVisiteds = async (quantity: number): Promise<ShortenedURL[]> => {
        const result = await this.repository
            .createQueryBuilder('shortened')
            .orderBy("shortened.visits", "DESC")
            .limit(quantity)
            .getMany();

        return result.map((shortenedURLEntity): ShortenedURL => {
            return ShortenerRepositoryConverter.fromEntityToModel(shortenedURLEntity);
        });
    }

    public update = async (shortenedURL: ShortenedURL): Promise<ShortenedURL> => {
        const shortenedURLEntity = ShortenerRepositoryConverter.fromModelToEntity(shortenedURL);

        const result = await this.repository.save(shortenedURLEntity);

        return ShortenerRepositoryConverter.fromEntityToModel(result);
    }
}