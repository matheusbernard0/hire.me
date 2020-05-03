import {ShortenerCreateRequestInterface} from '../dto/ShortenerCreateRequestInterface';
import {ShortenerRetrieveRequestInterface} from "../dto/ShortenerRetrieveRequestInterface";
import {ShortenerCreateResponseInterface} from "../dto/ShortenerCreateResponseInterface";
import {ShortenerRetrieveResponseInterface} from "../dto/ShortenerRetrieveResponseInterface";
import {FindMostVisitedRequestInterface} from "../dto/FindMostVisitedRequestInterface";
import {FindMostVisitedResponseInterface} from "../dto/FindMostVisitedResponseInterface";

export interface ShortenerServiceInterface {
    create: (createShortened: ShortenerCreateRequestInterface) => Promise<ShortenerCreateResponseInterface>;
    retrieve: (retrieveShortened: ShortenerRetrieveRequestInterface) => Promise<ShortenerRetrieveResponseInterface>;
    findMostVisiteds: (mostVisitedRequest: FindMostVisitedRequestInterface) => Promise<FindMostVisitedResponseInterface>

}