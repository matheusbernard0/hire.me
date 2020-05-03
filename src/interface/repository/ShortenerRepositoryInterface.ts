import {ShortenedURL} from "../../model/ShortenedURL";

export interface ShortenerRepositoryInterface {
    save: (shortenedUrl: ShortenedURL) => Promise<ShortenedURL>
    findByAlias: (shorturl: string) => Promise<ShortenedURL>
    findMostVisiteds: (quantity: number) => Promise<ShortenedURL[]>;
    update: (shortenedURL: ShortenedURL) => Promise<ShortenedURL>;
}
