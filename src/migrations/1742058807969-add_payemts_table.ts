import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPayemtsTable1742058807969 implements MigrationInterface {
    name = 'AddPayemtsTable1742058807969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_8624dad595ae567818ad9983b33\` ON \`orders\``);
        await queryRunner.query(`CREATE TABLE \`payments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`order_id\` varchar(255) NOT NULL, \`amount\` decimal(10,2) NOT NULL, \`status\` enum ('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending', \`payment_gateway_response\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b2f7b823a21562eeca20e72b00\` (\`order_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_8624dad595ae567818ad9983b33\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_8624dad595ae567818ad9983b33\``);
        await queryRunner.query(`DROP INDEX \`IDX_b2f7b823a21562eeca20e72b00\` ON \`payments\``);
        await queryRunner.query(`DROP TABLE \`payments\``);
        await queryRunner.query(`CREATE INDEX \`FK_8624dad595ae567818ad9983b33\` ON \`orders\` (\`productId\`)`);
    }

}
