import {StatisticsInterface} from './StatisticsInterface';

export interface ShortenerCreateResponseInterface {
    alias: string;
    url: string;
    statistics: StatisticsInterface
}