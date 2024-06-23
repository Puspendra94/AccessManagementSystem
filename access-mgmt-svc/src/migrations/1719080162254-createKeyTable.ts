import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateKeyTable1719080162254 implements MigrationInterface {
    name = 'CreateKeyTable1719080162254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "access-mgmt"."key" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "key" character varying NOT NULL, "expiryInMs" integer NOT NULL, "ttl" integer NOT NULL, CONSTRAINT "PK_5bd67cf28791e02bf07b0367ace" PRIMARY KEY ("id")); COMMENT ON COLUMN "access-mgmt"."key"."key" IS 'key which identifies the access'; COMMENT ON COLUMN "access-mgmt"."key"."expiryInMs" IS 'expiry time in ms'; COMMENT ON COLUMN "access-mgmt"."key"."ttl" IS 'time to live in ms'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "access-mgmt"."key"`);
    }

}
