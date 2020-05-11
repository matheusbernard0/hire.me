import {Request, Response} from 'express';
import {ShortenerControllerError} from "../error/ShortenerControllerError";
import {ShortenerServiceInterface} from "../interface/service/ShortenerServiceInterface";

export class ShortenerController {

    constructor(private shortenerService: ShortenerServiceInterface) {}

    public create = async (req: Request, res: Response) => {
        const { url, CUSTOM_ALIAS } = req.query;

        if (typeof url !== 'string') {
            throw new ShortenerControllerError('url must be informed', 400);
        }

        this.validateUrl(url);

        const shortenedUrl = await this.shortenerService.create({
            url: url,
            customAlias: CUSTOM_ALIAS ? String(CUSTOM_ALIAS): null,
        });

        return res.status(201).json(shortenedUrl);
    }

    public retrieve = async (req: Request, res: Response) => {

        const {alias} = req.params;

        if (typeof alias !== 'string') throw new ShortenerControllerError('alias must be informed', 400)

        const shortenedURL = await this.shortenerService.retrieve({
            alias: alias,
        });

        return res.redirect(shortenedURL.url);
    }

    public mostVisiteds = async (req: Request, res: Response) => {

        const {quantity} = req.params;

        if (!quantity) throw new ShortenerControllerError('quantity must be informed', 400)
        if ( isNaN(Number(quantity))) throw new ShortenerControllerError('quantity must be a number', 400)

        const mostVisiteds = await this.shortenerService.findMostVisiteds({
            quantity: parseInt(quantity),
        });

        return res.status(200).json(mostVisiteds);
    }

    private validateUrl = (url: string): void => {
        if(!url.startsWith('http://') && !url.startsWith('https://')) {
            throw new ShortenerControllerError('the informed url must follow the http/https protocol', 400);
        }
    }
}