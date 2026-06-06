import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTopupTransactions1780755659784 implements MigrationInterface {
    name = 'CreateTopupTransactions1780755659784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" character varying(20) NOT NULL, "user_id" character varying(20) NOT NULL, "offer_id" character varying(20) NOT NULL, "product_id" character varying(20) NOT NULL, "product_code" text NOT NULL, "status" character varying(32) NOT NULL, "amount" numeric(18,0) NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'DZD', "external_id" character varying(128), "inputs" jsonb NOT NULL, "failure_reason" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_transactions_user_external_id" ON "transactions" ("user_id", "external_id") WHERE "external_id" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "provider_dispatch_outbox" ("id" character varying(20) NOT NULL, "transaction_id" character varying(20) NOT NULL, "status" character varying(32) NOT NULL DEFAULT 'PENDING', "queue_name" character varying(64) NOT NULL, "job_name" character varying(64) NOT NULL, "payload" jsonb NOT NULL, "attempts" integer NOT NULL DEFAULT '0', "last_error" text, "enqueued_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_d9c4677a10a3592ec57797e64c" UNIQUE ("transaction_id"), CONSTRAINT "PK_529398b1cdcdcf77dd2e655c280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wallet_ledger_entries" ADD "transaction_id" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_12857f8a8c54e50f0b8de0b145c" FOREIGN KEY ("offer_id") REFERENCES "offers"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_8d5b2e87f2129081ebacc894f8f" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "provider_dispatch_outbox" ADD CONSTRAINT "FK_d9c4677a10a3592ec57797e64cb" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "provider_dispatch_outbox" DROP CONSTRAINT "FK_d9c4677a10a3592ec57797e64cb"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_8d5b2e87f2129081ebacc894f8f"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_12857f8a8c54e50f0b8de0b145c"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b"`);
        await queryRunner.query(`ALTER TABLE "wallet_ledger_entries" DROP COLUMN "transaction_id"`);
        await queryRunner.query(`DROP TABLE "provider_dispatch_outbox"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_transactions_user_external_id"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}
