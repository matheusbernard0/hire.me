import {Router} from "express";
import asyncHandler from "express-async-handler";
import {ShortenerController} from "../controller/ShortenerController";
import {ShortenerService} from "../service/ShortenerService";
import {ShortenerRepository} from "../repository/ShortenerRepository";
import logger from '../log/ShortenerLogger';

export class RouterBuilder {
    public static build(): Router {
        const shortenerController = new ShortenerController(new ShortenerService(new ShortenerRepository(), logger));

        return Router()
            .put('/', asyncHandler(shortenerController.create))
            .get('/:alias', asyncHandler(shortenerController.retrieve))
            .get('/mostVisiteds/:quantity', asyncHandler(shortenerController.mostVisiteds));
    }
}

