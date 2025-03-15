import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderEntityRemoveProductId1741978959979 implements MigrationInterface {
    name = 'UpdateOrderEntityRemoveProductId1741978959979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`product_id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`product_id\` int NOT NULL`);
    }

}
