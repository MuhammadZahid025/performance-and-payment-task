import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeResponseTypeInPaymentTable1742065160865 implements MigrationInterface {
    name = 'ChangeResponseTypeInPaymentTable1742065160865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`payment_gateway_response\``);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD \`payment_gateway_response\` json NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`payment_gateway_response\``);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD \`payment_gateway_response\` text NULL`);
    }

}
