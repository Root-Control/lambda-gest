import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './@database/config/database.module';
import { MarksModule } from './modules/marks';
import { DecodeJwtMiddleware } from './app.token.middleware';

@Module({
  imports: [DatabaseModule, MarksModule],
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
