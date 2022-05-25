import { MigrationInterface, QueryRunner } from "typeorm";
export declare class createMessages1653399400779 implements MigrationInterface {
    private table;
    private foreingKey;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
