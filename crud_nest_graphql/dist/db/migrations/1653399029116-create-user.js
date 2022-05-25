"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser1653399029116 = void 0;
const typeorm_1 = require("typeorm");
class createUser1653399029116 {
    constructor() {
        this.table = new typeorm_1.Table({
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
        });
    }
    async up(queryRunner) {
        await queryRunner.createTable(this.table);
    }
    async down(queryRunner) {
        await queryRunner.dropTable(this.table);
    }
}
exports.createUser1653399029116 = createUser1653399029116;
//# sourceMappingURL=1653399029116-create-user.js.map