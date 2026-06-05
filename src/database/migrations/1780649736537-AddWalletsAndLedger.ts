import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWalletsAndLedger1780649736537 implements MigrationInterface {
    name = 'AddWalletsAndLedger1780649736537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wallets" ("id" character varying(20) NOT NULL, "user_id" character varying(20) NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'DZD', "available_balance" numeric(18,0) NOT NULL DEFAULT '0', "reserved_balance" numeric(18,0) NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_92558c08091598f7a4439586cd" UNIQUE ("user_id"), CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet_ledger_entries" ("id" character varying(20) NOT NULL, "wallet_id" character varying(20) NOT NULL, "user_id" character varying(20) NOT NULL, "type" character varying(32) NOT NULL, "amount" numeric(18,0) NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'DZD', "available_balance_delta" numeric(18,0) NOT NULL, "reserved_balance_delta" numeric(18,0) NOT NULL, "available_balance_after" numeric(18,0) NOT NULL, "reserved_balance_after" numeric(18,0) NOT NULL, "actor_user_id" character varying(20), "note" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d18ec2600fc04a812dc53af2be1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "FK_92558c08091598f7a4439586cda" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet_ledger_entries" ADD CONSTRAINT "FK_4a3a591ddde4fb1dd7c7522c0e3" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet_ledger_entries" ADD CONSTRAINT "FK_a6bd86f2bf53f9b59c4d475b39f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet_ledger_entries" ADD CONSTRAINT "FK_7315c836664b3b79e74b477363b" FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet_ledger_entries" DROP CONSTRAINT "FK_7315c836664b3b79e74b477363b"`);
        await queryRunner.query(`ALTER TABLE "wallet_ledger_entries" DROP CONSTRAINT "FK_a6bd86f2bf53f9b59c4d475b39f"`);
        await queryRunner.query(`ALTER TABLE "wallet_ledger_entries" DROP CONSTRAINT "FK_4a3a591ddde4fb1dd7c7522c0e3"`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_92558c08091598f7a4439586cda"`);
        await queryRunner.query(`DROP TABLE "wallet_ledger_entries"`);
        await queryRunner.query(`DROP TABLE "wallets"`);
    }

}
