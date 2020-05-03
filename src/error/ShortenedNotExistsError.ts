import {NotExistsDataInterface} from "../interface/error/NotExistsDataInterface";

export class ShortenedNotExistsError extends Error{
    public status: number;
    public data: NotExistsDataInterface;

    constructor(message: string, status: number, data: NotExistsDataInterface) {
        super(message);
        this.status = status;
        this.data = data;
    }
}