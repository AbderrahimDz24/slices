import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1780684508906 implements MigrationInterface {
  name = 'Initial1780684508906';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."role" AS ENUM('ADMIN', 'REGULAR')`,
    );

    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" character varying(20) NOT NULL,
        "email" text NOT NULL,
        "password" text NOT NULL,
        "role" "public"."role" NOT NULL DEFAULT 'REGULAR',
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "products" (
        "id" character varying(20) NOT NULL,
        "code" text NOT NULL,
        "name" text NOT NULL,
        "type" character varying(64) NOT NULL,
        CONSTRAINT "UQ_7cfc24d6c24f0ec91294003d6b8" UNIQUE ("code"),
        CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "offers" (
        "id" character varying(20) NOT NULL,
        "product_id" character varying(20) NOT NULL,
        "code" text NOT NULL,
        "status" character varying(32) NOT NULL,
        "input_schema" jsonb NOT NULL,
        CONSTRAINT "PK_4c88e956195bba85977da21b8f4" PRIMARY KEY ("id"),
        CONSTRAINT "FK_07d9a626265f252fc5c743c42b5"
          FOREIGN KEY ("product_id")
          REFERENCES "products"("id")
          ON DELETE CASCADE
          ON UPDATE NO ACTION
      )
    `);

    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_76fc1c60c16b4f4c52a72c9392" ON "offers" ("product_id", "code")`,
    );

    await queryRunner.query(`
      CREATE TABLE "wallets" (
        "id" character varying(20) NOT NULL,
        "user_id" character varying(20) NOT NULL,
        "currency" character varying(3) NOT NULL DEFAULT 'DZD',
        "available_balance" numeric(18,0) NOT NULL DEFAULT '0',
        "reserved_balance" numeric(18,0) NOT NULL DEFAULT '0',
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "REL_92558c08091598f7a4439586cd" UNIQUE ("user_id"),
        CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"),
        CONSTRAINT "FK_92558c08091598f7a4439586cda"
          FOREIGN KEY ("user_id")
          REFERENCES "users"("id")
          ON DELETE RESTRICT
          ON UPDATE NO ACTION
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "wallet_ledger_entries" (
        "id" character varying(20) NOT NULL,
        "wallet_id" character varying(20) NOT NULL,
        "user_id" character varying(20) NOT NULL,
        "type" character varying(32) NOT NULL,
        "amount" numeric(18,0) NOT NULL,
        "currency" character varying(3) NOT NULL DEFAULT 'DZD',
        "available_balance_delta" numeric(18,0) NOT NULL,
        "reserved_balance_delta" numeric(18,0) NOT NULL,
        "available_balance_after" numeric(18,0) NOT NULL,
        "reserved_balance_after" numeric(18,0) NOT NULL,
        "actor_user_id" character varying(20),
        "note" text,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_d18ec2600fc04a812dc53af2be1" PRIMARY KEY ("id"),
        CONSTRAINT "FK_4a3a591ddde4fb1dd7c7522c0e3"
          FOREIGN KEY ("wallet_id")
          REFERENCES "wallets"("id")
          ON DELETE RESTRICT
          ON UPDATE NO ACTION,
        CONSTRAINT "FK_a6bd86f2bf53f9b59c4d475b39f"
          FOREIGN KEY ("user_id")
          REFERENCES "users"("id")
          ON DELETE RESTRICT
          ON UPDATE NO ACTION,
        CONSTRAINT "FK_7315c836664b3b79e74b477363b"
          FOREIGN KEY ("actor_user_id")
          REFERENCES "users"("id")
          ON DELETE SET NULL
          ON UPDATE NO ACTION
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "api_keys" (
        "id" character varying(20) NOT NULL,
        "user_id" character varying(20) NOT NULL,
        "name" text NOT NULL,
        "key_preview" character varying(36) NOT NULL,
        "secret_hash" character(64) NOT NULL,
        "mode" character varying(8) NOT NULL,
        "last_used_at" TIMESTAMP WITH TIME ZONE,
        "revoked_at" TIMESTAMP WITH TIME ZONE,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_5c8a79801b44bd27b79228e1dad" PRIMARY KEY ("id"),
        CONSTRAINT "FK_a3baee01d8408cd3c0f89a9a973"
          FOREIGN KEY ("user_id")
          REFERENCES "users"("id")
          ON DELETE CASCADE
          ON UPDATE NO ACTION
      )
    `);

    await queryRunner.query(
      `CREATE INDEX "IDX_api_keys_user_id_active" ON "api_keys" ("user_id") WHERE "revoked_at" IS NULL`,
    );

    await queryRunner.query(`
      INSERT INTO "products" ("id", "code", "name", "type")
      VALUES
        ('prd_mobilis_00000001', 'mobilis', 'Mobilis', 'MOBILE_TOPUP'),
        ('prd_djezzy_000000002', 'djezzy', 'Djezzy', 'MOBILE_TOPUP'),
        ('prd_ooredoo_00000003', 'ooredoo', 'Ooredoo', 'MOBILE_TOPUP')
    `);

    const inputSchema = JSON.stringify({
      version: 1,
      fields: [
        {
          name: 'msisdn',
          type: 'string',
          required: true,
          constraints: { format: 'DZ_E164_MSISDN' },
        },
        {
          name: 'amount',
          type: 'integer',
          required: true,
          constraints: { min: 100, max: 10000, currency: 'DZD' },
        },
      ],
    });

    await queryRunner.query(
      `
        INSERT INTO "offers" ("id", "product_id", "code", "status", "input_schema")
        VALUES
          ('off_mobilis__prepaid', 'prd_mobilis_00000001', 'prepaid', 'ACTIVE', $1::jsonb),
          ('off_djezzy___prepaid', 'prd_djezzy_000000002', 'prepaid', 'ACTIVE', $2::jsonb),
          ('off_ooredoo__prepaid', 'prd_ooredoo_00000003', 'prepaid', 'ACTIVE', $3::jsonb)
      `,
      [inputSchema, inputSchema, inputSchema],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_api_keys_user_id_active"`);
    await queryRunner.query(`DROP TABLE "api_keys"`);
    await queryRunner.query(`DROP TABLE "wallet_ledger_entries"`);
    await queryRunner.query(`DROP TABLE "wallets"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_76fc1c60c16b4f4c52a72c9392"`);
    await queryRunner.query(`DROP TABLE "offers"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."role"`);
  }
}
