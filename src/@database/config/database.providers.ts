import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

/**
 * Database provider
 *
 * contains database factory provider
 * we use TypeOrmModule here and add connection
 */
export const DatabaseProvider = TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'postgres',
    host: '52.3.189.211',
    port: 5432,
    username: 'postgres',
    password: 'secretsystem',
    database: 'gesttiona',
    entities: [`${__dirname}/../../**/*.model.{ts,js}`],
    migrations: [`${__dirname}/../migrations/*.{ts,js}`],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
    dropSchema: false,
  }),
});
