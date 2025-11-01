import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1761993780265 implements MigrationInterface {
    name = 'Initial1761993780265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."role" AS ENUM('OWNER', 'REGULAR')`);
        await queryRunner.query(`CREATE TABLE "users"
                                 (
                                   "id"       uuid            NOT NULL DEFAULT uuidv4(),
                                   "email"    text            NOT NULL,
                                   "password" text            NOT NULL,
                                   "role"     "public"."role" NOT NULL DEFAULT 'REGULAR',
                                   CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                                   CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                                 )`);
        await queryRunner.query(`CREATE TABLE "products"
                                 (
                                   "id"          uuid             NOT NULL DEFAULT uuidv4(),
                                   "name"        text             NOT NULL,
                                   "price"       double precision NOT NULL,
                                   "description" text,
                                   "category"    text,
                                   "image"       text,
                                   CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"),
                                   CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
                                 )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."role"`);
    }

}
