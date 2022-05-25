import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUser1653399029116 implements MigrationInterface {
    private table =  new Table({
        name: "users",
        columns: [
            {
                name: "id",
                type: "integer",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: "email",
                type: "varchar",
                isUnique: true,
                length: '225',
            },
            {
                name: 'created_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
              },
              {
                name: 'updated_at',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
              },
        ]
    })
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
    }

}
