import {ShortenerRepositoryInterface} from '../interface/repository/ShortenerRepositoryInterface';
import {ShortenedURL} from "../model/ShortenedURL";
import { getRepository, Repository} from "typeorm";


export class ShortenerRepository implements ShortenerRepositoryInterface{
     private repository: Repository<ShortenedURL>;

    constructor() {
        this.repository = getRepository(ShortenedURL);
    }

    public save = async (shortenedURL: ShortenedURL): Promise<ShortenedURL> => {
        return await this.repository.save(shortenedURL);
    }

    public findByAlias = async (alias: string): Promise<ShortenedURL> => {
        return await this.repository
            .createQueryBuilder('shortened')
            .where('shortened.alias = :alias', { alias })
            .getOne();
    }

    public findMostVisiteds = async (quantity: number): Promise<ShortenedURL[]> => {
        return await this.repository
            .createQueryBuilder('shortened')
            .orderBy("shortened.visits", "DESC")
            .limit(quantity)
            .getMany();
    }

    public update = async (shortenedURL: ShortenedURL): Promise<ShortenedURL> => {
        return await this.repository.save(shortenedURL);
    }
}