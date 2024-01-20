import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './mark.model';
import { MarkController } from './marks.controller';
import { MarksService } from './marks.service';
import { MarkRepository } from './marks.repository';
import { AbstractApiModule } from '../@third-party-services/abstract-api';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mark]),
    AbstractApiModule
  ],
  controllers: [MarkController],
  providers: [MarksService, MarkRepository],
})
export class MarksModule {}
