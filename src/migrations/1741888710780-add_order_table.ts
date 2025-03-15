import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderTable1741888710780 implements MigrationInterface {
    name = 'AddOrderTable1741888710780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`product_id\` int NOT NULL, \`quantity\` int NOT NULL, \`ordered_at\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`orders\``);
    }

}
