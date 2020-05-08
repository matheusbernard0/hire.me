import shortenerErrorHandler from "../error/handler/shortenerErrorHandler";

export class ShortenedURL {
    private id?: number;
    private url: string;
    private alias: string;
    private shortenedurl: string;
    private visits: number;

    constructor(id: number, url: string, alias: string, shortenedurl: string, visits: number) {
        this.validateParameters(id, url, alias, shortenedurl, visits);

        this.id = id;
        this.url = url;
        this.alias = alias;
        this.shortenedurl = shortenedurl
        this.visits = visits;
    }

    public getId(): number {
        return this.id;
    } ;

    public getUrl(): string {
        return this.url;
    }

    public getAlias(): string {
        return this.alias;
    }

    public getVisits(): number {
        return this.visits;
    }

    public getShortenedurl(): string {
        return this.shortenedurl;
    }

    public increaseVisits(): void {
        this.visits += 1;
    }

    private validateParameters(id: number, url: string, alias: string, shortenedurl: string,  visits: number): void {
        if (id && typeof id !== 'number') throw new Error('url must be a number');

        if (typeof url !== 'string') throw new Error('url must be a string');

        if (typeof alias !== 'string') throw new Error('alias must be a string');

        if (typeof shortenedurl !== 'string') throw new Error('shortenedurl must be a string');

        if (typeof visits !== 'number') throw new Error('visits must be a number');
    }
}