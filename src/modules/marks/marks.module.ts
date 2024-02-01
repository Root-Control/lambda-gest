import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './mark.model';
import { MarkController } from './marks.controller';
import { MarksService } from './marks.service';
import { MarkRepository } from './marks.repository';
import { AbstractApiModule } from '../@third-party-services/abstract-api';
import { RabbitMqModule } from '../@microservices/rabbit-mq';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mark]),
    AbstractApiModule,
    RabbitMqModule,
  ],
  controllers: [MarkController],
  providers: [MarksService, MarkRepository],
})
export class MarksModule {}
