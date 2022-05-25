"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessages1653399400779 = void 0;
const typeorm_1 = require("typeorm");
class createMessages1653399400779 {
    constructor() {
        this.table = new typeorm_1.Table({
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
        this.foreingKey = new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            referencedTableName: 'users'
        });
    }
    async up(queryRunner) {
        await queryRunner.createTable(this.table);
    }
    async down(queryRunner) {
        await queryRunner.dropTable(this.table);
    }
}
exports.createMessages1653399400779 = createMessages1653399400779;
//# sourceMappingURL=1653399400779-create-messages.js.map