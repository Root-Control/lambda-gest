import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './@database/config/database.module';
import { MarksModule } from './modules/marks';
import { DecodeJwtMiddleware } from './app.token.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './@redis/redis.module';
import configuration from './config/configuration';
import { RedisClientIds } from './@redis/redis.const';
import { IRedis } from './config/configuration.interface';
import { ThirdPartyServicesModule } from './modules/@third-party-services';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    RedisModule.forRootAsync({
      providerId: RedisClientIds.main,
      useFactory: async (configService: ConfigService) => {
        const { host, port } = configService.get<IRedis>('redis');
        return { host, port };
      },
      inject: [ConfigService],
    }),
    HttpModule,
    DatabaseModule,
    ThirdPartyServicesModule,
    MarksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecodeJwtMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
