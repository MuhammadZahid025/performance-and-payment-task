import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPaymentAndAttemptsRelation1742059224287 implements MigrationInterface {
    name = 'AddPaymentAndAttemptsRelation1742059224287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_attempts\` ADD \`paymentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_attempts\` ADD CONSTRAINT \`FK_6657761cef2e4909ca5c6cd2010\` FOREIGN KEY (\`paymentId\`) REFERENCES \`payments\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment_attempts\` DROP FOREIGN KEY \`FK_6657761cef2e4909ca5c6cd2010\``);
        await queryRunner.query(`ALTER TABLE \`payment_attempts\` DROP COLUMN \`paymentId\``);
    }

}
