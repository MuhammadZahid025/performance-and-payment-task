import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationToProductsAndOrders1741889175446 implements MigrationInterface {
    name = 'AddRelationToProductsAndOrders1741889175446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_8624dad595ae567818ad9983b33\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_8624dad595ae567818ad9983b33\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`productId\``);
    }

}
