import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1733431362228 implements MigrationInterface {
    name = 'InitMigration1733431362228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`credit_cards\` (\`id\` int NOT NULL AUTO_INCREMENT, \`card_number\` varchar(16) NOT NULL, \`credit_limit\` decimal(10,2) NOT NULL, \`balance\` decimal(10,2) NOT NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`credit_cards\` ADD CONSTRAINT \`FK_9b45d5bea143bd999722d512195\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`credit_cards\` DROP FOREIGN KEY \`FK_9b45d5bea143bd999722d512195\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`credit_cards\``);
    }

}
