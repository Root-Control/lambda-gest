import { Module } from '@nestjs/common';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';

@Module({
  imports: [RabbitMqModule],
  exports: [RabbitMqModule],
})
export class MicroServicesModule {}
