import dotenv from 'dotenv';
import {EnvironmentConfigurer} from "../../src/config/EnvironmentConfigurer";

jest.mock('dotenv');

const envVariables = new Map();
envVariables.set('SERVER_PORT', 3000);
envVariables.set('DB_HOST', 'DB_HOST');
envVariables.set('DB_PORT', 3306);
envVariables.set('DB_USERNAME', 'DB_USERNAME');
envVariables.set('DB_PASSWORD', 'DB_PASSWORD');

describe('EnvironmentConfigurer', () => {

    beforeEach(() => {
        envVariables.forEach((value, key) => {
            process.env[key] = value;
        });
    });

    it('caso NODE_ENV seja diferente de \'producao\', deve carregar as informação do .env', () => {

        process.env.NODE_ENV = 'dev';


        dotenv.config = jest.fn();


        EnvironmentConfigurer.configure();

        expect(dotenv.config).toBeCalledTimes(1);

    });

    describe('deve validar se todas as variáveis de ambiente estão setadas',  () => {

        envVariables.forEach( (value, key) => {

            it(`caso ${key} não tenha sido setado, deve jogar uma exceção`, () => {
                delete process.env[key];

                const runner = () => {
                    EnvironmentConfigurer.configure();
                }

                expect(runner).toThrowError(`${key} must be configured in environment!`)
            });

        })

    });

});