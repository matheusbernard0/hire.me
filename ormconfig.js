const path = require("path");

module.exports = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [
        path.join(__dirname, '/build/entity/**/*{.ts,.js}')
    ],
    migrations: [
        path.join(__dirname, 'build/migration/**/*{.ts,.js}')
    ],
    subscribers: [
        path.join(__dirname, 'src/subscriber/**/*{.ts,.js}')
    ],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber"
    }
}