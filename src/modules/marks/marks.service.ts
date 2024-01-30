import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarkRepository } from './marks.repository';
import { MarkQueryDto, MarkDto } from './dto/mark.dto';
import { plainToClass } from 'class-transformer';
import { FindManyOptions } from 'typeorm';
import { Mark } from './mark.model';
import { User } from '@common/types/express';
import { AbstractApiService } from '../@third-party-services/abstract-api/abstract-api.service';
import { RequestMarkDto } from './dto/request-mark.dto';
import { MarkValidator } from './mark.validator';
import { RedisService } from 'src/@redis/redis.service';
import * as moment from 'moment';
import {
  RedisLocation,
  RedisLocationStatus,
  RedisMarkType,
  RedisShift,
} from '@common/global-types/types';
import { Statuslocations } from '@common/types/enums';
@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(Mark)
    private readonly markRepository: MarkRepository,
    private readonly abstractApiService: AbstractApiService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * 
   * @param createMarkDto TODO, WORKERDAY
   * @param user 
   * @returns 
   */
  async executeMark(createMarkDto: RequestMarkDto, user: User) {
    const { date } = createMarkDto;
    const formattedDate = moment(date).format('YYYY-MM-DD');

    const locationKey = `location_${createMarkDto.location}`;

    const markTypeKey = `mark_type_${createMarkDto.mark_type}`;

    const workerDayPattern = `${formattedDate}_${user.id}_${user.currentTeam.id}`;
    const workerDayKey = `${workerDayPattern}_${createMarkDto.mark_type}`;
    const workerDayJustification = `${workerDayPattern}_justification`;

    const shiftPattern = `shift`;
    const shiftUserKey = `${shiftPattern}_${user.currentTeam.id}_${user.id}`;

    const markValidator = new MarkValidator(user, date);

    const workerDayExists = await this.redisService.get<boolean>(workerDayKey);
    const workerDayJustificationExists = await this.redisService.get<boolean>(
      workerDayJustification,
    );

    let shift: RedisShift = null;
    const markType = await this.redisService.get<RedisMarkType>(markTypeKey);

    if (createMarkDto.shift) {
      const shiftKey = `${shiftPattern}_${createMarkDto.shift}`;
      shift = await this.redisService.get<RedisShift>(shiftKey);
    } else {
      shift = await this.redisService.get<RedisShift>(shiftUserKey);
    }

    let locationStatus: RedisLocationStatus = null;

    switch (createMarkDto.status_location) {
      case Statuslocations.NO_GPS:
        locationStatus = await this.redisService.get<RedisLocationStatus>(
          `mark_location_status_gps_disabled`,
        );
        break;
      case Statuslocations.NOT_FOUND:
        locationStatus = await this.redisService.get<RedisLocationStatus>(
          `mark_location_status_outside_allowed_area`,
        );
        break;
      case Statuslocations.FOUND:
      case Statuslocations.FOUND_PLUS:
        locationStatus = await this.redisService.get<RedisLocationStatus>(
          `mark_location_status_ok`,
        );
        break;
    }

    const location = await this.redisService.get<RedisLocation>(locationKey);

    console.log(location);
    console.log(locationStatus);
    console.log(markType);
    console.log(shift);

    try {
      markValidator
        .isValidUser()
        .isValidContract()
        .workerDayexists(workerDayExists)
        .verifyUserShift(shift)
        .haveJustifiedAssistance(workerDayJustificationExists);

      const { errors } = markValidator;
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


  async executeCheckpointMark(createMarkDto: RequestMarkDto, user: User) {

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
