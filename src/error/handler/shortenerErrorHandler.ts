import {ShortenerControllerError} from "../ShortenerControllerError";
import {ShortenedNotExistsError} from "../ShortenedNotExistsError";
import {ShortenedAlreadyExistsError} from "../ShortenedAlreadyExistsError";
import logger from '../../log/ShortenerLogger';

export default function(err, req, res, next) {
    logger.error(err.stack);

    if(err instanceof ShortenerControllerError){
        return res.status(err.status)
            .json(err.message);
    }

    if (err instanceof ShortenedNotExistsError){
        return res.status(err.status)
            .json(err.data);
    }

    if (err instanceof ShortenedAlreadyExistsError){
        return res.status(err.status)
            .json(err.data);
    }

    return res.status(500).json({
        message: 'Internal server error!',
    });
}