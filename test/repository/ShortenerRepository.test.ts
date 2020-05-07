import {ShortenerRepository} from "../../src/repository/ShortenerRepository";
import typeorm, {getRepository, Repository} from "typeorm";

jest.mock('typeorm');

describe('ShortenerRepository', () => {

    describe('construct', function () {
        new ShortenerRepository();

        expect(getRepository).toBeCalled();
    });

    describe('save', () => {
        const repo = new ShortenerRepository();
    });

    describe('findByAlias', () => {

    });

    describe('findMostVisiteds', () => {

    });

    describe('update', () => {

    });
});