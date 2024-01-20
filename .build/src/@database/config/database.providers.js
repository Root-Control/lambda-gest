"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseProvider = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
exports.DatabaseProvider = typeorm_1.TypeOrmModule.forRootAsync({
    useFactory: () => ({
        type: 'postgres',
        host: '52.3.189.211',
        port: 5432,
        username: 'postgres',
        password: 'secretsystem',
        database: 'gesttiona',
        entities: [`${__dirname}/../../**/*.model.{ts,js}`],
        migrations: [`${__dirname}/../migrations/*.{ts,js}`],
        namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
        synchronize: false,
        dropSchema: false,
    }),
});
//# sourceMappingURL=database.providers.js.map