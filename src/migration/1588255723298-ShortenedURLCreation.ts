import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ShortenedURLCreation1588255723298 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.createTable(new Table({
            name: 'shortened',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'url',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'alias',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'shortenedurl',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'visits',
                    type: 'int',
                    isNullable: false
                }
            ]
        }), true)

    }

    public async down(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.dropTable('shortened');

    }

}
