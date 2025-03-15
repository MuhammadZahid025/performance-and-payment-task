import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultValueOrderAt1741979125093 implements MigrationInterface {
    name = 'AddDefaultValueOrderAt1741979125093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`ordered_at\` \`ordered_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`ordered_at\` \`ordered_at\` timestamp NOT NULL`);
    }

}
