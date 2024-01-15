import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './mark.model';
import { MarkController } from './marks.controller';
import { MarksService } from './marks.service';
import { MarkRepository } from './marks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Mark])],
  controllers: [MarkController],
  providers: [MarksService, MarkRepository],
})
export class MarksModule {}
