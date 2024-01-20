import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarkRepository } from './marks.repository';
import { MarkQueryDto, MarkDto } from './dto/mark.dto';
import { plainToClass } from 'class-transformer';
import { FindManyOptions } from 'typeorm';
import { Mark } from './mark.model';
import { User } from '@common/types/express';
import { AbstractApiService } from '../@third-party-services/abstract-api/abstract-api.service';
import { CreateMarkDto } from './dto/create-mark.dto';
import { MarkValidator } from './mark.validator';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(Mark)
    private readonly markRepository: MarkRepository,
    private readonly abstractApiService: AbstractApiService,
  ) {}

  async executeMark(createMarkDto: CreateMarkDto, user: User) {
    const markValidator = new MarkValidator(user);
    try {
      markValidator
        .isValidUser()
        .isValidContract()
        .workerDayexists()
        .verifyUserShift()
        .haveJustifiedAssistance();

      const { errors } = markValidator;
      console.log(createMarkDto);
      console.log(user);
      console.log(errors);

      const serviceTime = await this.abstractApiService.getTime('America/Lima');
      console.log(serviceTime);
    } catch (ex) {
      console.log(ex);
    }
    /**
     * Params
     * mark_type
     */
    /**
     * 1.- Obtener el usuario
     * 2.- Obtener fecha y hora enviada por el frontend
     * 3.- Obtener la hora basado en su region (servicio externo)
     * 4.- Verificar si está dentro del contrato
     *  4.1. Si no lo está, añadiremos metadata de informacion de error e invalidaremos la marcacion
     *  4.2. valid = false
     *  4.3. metadata errors: ['out of contract'];
     *
     * 5.-
     */
    return true;
  }


  async executeCheckpointMark(createMarkDto: CreateMarkDto, user: User) {

  }

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
