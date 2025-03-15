import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeCreatedAtType1741977772137 implements MigrationInterface {
    name = 'ChangeCreatedAtType1741977772137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`ordered_at\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`ordered_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`created_at\` datetime(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`ordered_at\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`ordered_at\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`updated_at\` datetime NOT NULL`);
    }

}
