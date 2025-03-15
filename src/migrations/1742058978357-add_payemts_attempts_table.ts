import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPayemtsAttemptsTable1742058978357 implements MigrationInterface {
    name = 'AddPayemtsAttemptsTable1742058978357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`payment_attempts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`attemp_number\` int NOT NULL, \`status\` enum ('success', 'failure') NOT NULL, \`response\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`payment_attempts\``);
    }

}
