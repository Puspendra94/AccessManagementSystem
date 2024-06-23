import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeExpiryInMsToLimitInKeyTable1719163679690 implements MigrationInterface {
    name = 'ChangeExpiryInMsToLimitInKeyTable1719163679690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access-mgmt"."key" RENAME COLUMN "expiryInMs" TO "limit"`);
        await queryRunner.query(`COMMENT ON COLUMN "access-mgmt"."key"."limit" IS 'number of attempts before it expires'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "access-mgmt"."key"."limit" IS 'expiry time in ms'`);
        await queryRunner.query(`ALTER TABLE "access-mgmt"."key" RENAME COLUMN "limit" TO "expiryInMs"`);
    }

}
