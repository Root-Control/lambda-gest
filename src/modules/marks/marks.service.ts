import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarkRepository } from './marks.repository';
import { MarkQueryDto, MarkDto } from './dto/mark.dto';
import { plainToClass } from 'class-transformer';
import { FindManyOptions } from 'typeorm';
import { Mark } from './mark.model';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(Mark)
    private readonly markRepository: MarkRepository,
  ) {}

  async find(query: MarkQueryDto & FindManyOptions): Promise<MarkDto[]> {
    try {
      query.take = 10;
      const marks = await this.markRepository.find(query as FindManyOptions);
      console.log(1);
      return marks.map((mark) => plainToClass(MarkDto, mark));
    } catch (ex) {
      console.log(2);
      throw new HttpException(ex, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findById(markId: number): Promise<MarkDto> {
    try {
      const mark = await this.markRepository.findOne({ where: { id: markId } });
      return plainToClass(MarkDto, mark);
    } catch (ex) {
      throw new HttpException(ex, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
