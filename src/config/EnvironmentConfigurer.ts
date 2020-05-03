import dotenv from 'dotenv';

export class EnvironmentConfigurer {

    private static validate = () => {
        const variables: string[] = ['SERVER_PORT', 'DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD'];
        variables.forEach((variable) => {
            if (!process.env[variable]) throw new Error('SERVER_PORT must be configured in environment!');
        });
        return;
    }

    public static configure = () => {

        if(process.env.NODE_ENV !== 'production'){
            dotenv.config();
        }

        EnvironmentConfigurer.validate();
    }

}