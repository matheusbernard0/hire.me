import winston, {format, Logger} from "winston";
import {ShortenerLoggerInterface} from "../interface/log/ShortenerLoggerInterface";

class ShortenerLogger implements ShortenerLoggerInterface{

    private logger: Logger;

    constructor() {
        const { combine, timestamp, label, printf } = format;

        const myFormat = printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
        });

        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL,
            format: combine(
                label({ label: 'ShortenerApplication' }),
                timestamp(),
                myFormat
            ),
            transports: [
                new winston.transports.Console(),
            ]
        });
    }

    info(message: string): void {
        this.logger.info(message);
    }

    warn(message: string): void {
        this.logger.warn(message);
    }

    error(message: string): void {
        this.logger.error(message);
    }
}

export default new ShortenerLogger();