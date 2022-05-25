import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createMessages1653399400779 implements MigrationInterface {
    private table = new Table({
        name: "messages",
        columns: [
            {
                name: "id",
                type: "integer",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
            },
            {
                name: "user_id",
                type: "integer",
            },
            {
                name: "content",
                type: "varchar",
                length: '225',
                isNullable: false,
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
    });

    private foreingKey = new TableForeignKey({
        columnNames: ['user_id'], // Essa coluna guarda a chave a outra tabela
        referencedColumnNames: ['id'], // Vai procurar em qual coluna na outra tabela?
        onDelete: 'CASCADE', // Se apagar o user, apaga a msg junto
        referencedTableName: 'users' // Vai mandar esse relacionamento pra qual tabela?
    })

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table);
    }

}
