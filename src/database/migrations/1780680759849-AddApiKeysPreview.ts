import { MigrationInterface, QueryRunner } from "typeorm";

export class AddApiKeysPreview1780680759849 implements MigrationInterface {
    name = 'AddApiKeysPreview1780680759849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "api_keys" ("id" character varying(20) NOT NULL, "user_id" character varying(20) NOT NULL, "name" text NOT NULL, "key_preview" character varying(36) NOT NULL, "secret_hash" character(64) NOT NULL, "mode" character varying(8) NOT NULL, "last_used_at" TIMESTAMP WITH TIME ZONE, "revoked_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_5c8a79801b44bd27b79228e1dad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_api_keys_user_id_active" ON "api_keys" ("user_id") WHERE "revoked_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "api_keys" ADD CONSTRAINT "FK_a3baee01d8408cd3c0f89a9a973" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "api_keys" DROP CONSTRAINT "FK_a3baee01d8408cd3c0f89a9a973"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_api_keys_user_id_active"`);
        await queryRunner.query(`DROP TABLE "api_keys"`);
    }

}
