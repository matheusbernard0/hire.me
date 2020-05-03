import {ShortenerCreateRequestInterface} from "../interface/dto/ShortenerCreateRequestInterface";
import {ShortenerRetrieveRequestInterface} from "../interface/dto/ShortenerRetrieveRequestInterface";
import {FindMostVisitedRequestInterface} from "../interface/dto/FindMostVisitedRequestInterface";
import {ShortenerServiceError} from "../error/ShortenerServiceError";

export class ShortenerValidator {

    public static validateCreateRequest = (createRequest: ShortenerCreateRequestInterface): void => {
        if (!createRequest) throw new ShortenerServiceError('createRequest deve ser informado!');

        if (!ShortenerValidator.isObject(createRequest)) throw new ShortenerServiceError('createRequest deve ser um objeto!');

        if (typeof createRequest.url !== 'string') throw new ShortenerServiceError('createRequest.url deve ser do tipo string!');

        return;
    }

    public static validateRetrieveRequest = (retrieveRequest: ShortenerRetrieveRequestInterface): void => {
        if(!retrieveRequest) throw new Error('retrieveRequest deve ser informado!');

        if(!ShortenerValidator.isObject(retrieveRequest)) throw new Error('retrieveRequest deve ser um objeto!');

        if(typeof retrieveRequest.alias !== 'string') throw new ShortenerServiceError('retrieveRequest.alias deve ser do tipo string!');

    }

    public static validateFindMoreVisitedRequest = (findMostVisitedsRequest: FindMostVisitedRequestInterface): void => {
        if(!findMostVisitedsRequest) throw new Error('findMostVisitedsRequest deve ser informado!');

        if(!ShortenerValidator.isObject(findMostVisitedsRequest)) throw new ShortenerServiceError('findMostVisitedsRequest deve ser um objeto!');

        if (typeof findMostVisitedsRequest.quantity !== 'number') throw new ShortenerServiceError('findMostVisitedsRequest.quantity deve ser do tipo number!');
    }

    private static isObject(data: any): boolean {
        const isObject = typeof data === 'object';
        const isArray = Array.isArray(data);
        const isNull = data == null;

        return isObject && !isArray && !isNull;
    }

}