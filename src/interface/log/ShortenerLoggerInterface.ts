export interface ShortenerLoggerInterface {
    info: (message:string) => void;
    warn: (message:string) => void;
    error: (message:string) => void;
}