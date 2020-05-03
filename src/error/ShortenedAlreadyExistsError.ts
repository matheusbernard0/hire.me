import {AlreadyExistsDataInterface} from "../interface/error/AlreadyExistsDataInterface";

export class ShortenedAlreadyExistsError extends Error{
    public status: number;
    public data: AlreadyExistsDataInterface;

    constructor(message: string, status: number, data: AlreadyExistsDataInterface) {
        super(message);
        this.status = status;
        this.data = data;
    }
}