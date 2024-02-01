import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarkRepository } from './marks.repository';
import { MarkQueryDto, MarkDto } from './dto/mark.dto';
import { plainToClass } from 'class-transformer';
import { FindManyOptions } from 'typeorm';
import { Mark } from './mark.model';
import { User } from '../../@common/types/express';
import { AbstractApiService } from '../@third-party-services/abstract-api/abstract-api.service';
import { RequestMarkDto } from './dto/request-mark.dto';
import { MarkValidator } from './mark.validator';
import { RedisService } from 'src/@redis/redis.service';
import * as moment from 'moment';
import {
  RedisLocation,
  RedisLocationStatus,
  RedisMarkType,
} from '@common/global-types/types';
import { Statuslocations } from '../../@common/types/enums';
import { CreateWorkerDayDto } from '../worker-days/dto/create-worker-day.dto';
import { v4 } from 'uuid';
import { ClientProxy } from '@nestjs/microservices';
import { diffInMinutes } from '@common/utilities/utils';

const MARK_PATTERN = 'mark';
@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(Mark)
    private readonly markRepository: MarkRepository,
    private readonly abstractApiService: AbstractApiService,
    private readonly redisService: RedisService,
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  /**
   *
   * @param createMarkDto TODO, WORKERDAY
   * @param user
   * @returns
   */
  async executeMark(requestMarkDto: RequestMarkDto, user: User) {
    const tmpKey = v4();
    const { date } = requestMarkDto;
    let realDate;

    const locationKey = `location_${requestMarkDto.location}`;

    const markTypeKey = `mark_type_${requestMarkDto.mark_type}`;

    const workerDayPattern = `${date}_${user.id}_${user.currentTeam.id}`;
    const workerDayJustification = `${workerDayPattern}_justification`;

    const shiftPattern = `shift`;
    const shiftUserKey = `${shiftPattern}_${user.currentTeam.id}_${user.id}`;

    const markValidator = new MarkValidator(user, date);

    let workerDay =
      await this.redisService.get<CreateWorkerDayDto>(workerDayPattern);
    const workerDayJustificationExists = await this.redisService.get<boolean>(
      workerDayJustification,
    );

    let shiftId: number = null;
    const markType = await this.redisService.get<RedisMarkType>(markTypeKey);

    if (requestMarkDto.shift) {
      const shiftKey = `${shiftPattern}_${requestMarkDto.shift}`;
      shiftId = await this.redisService.get<number>(shiftKey);
      //shift_1
      //shift => true o false
    } else {
      shiftId = await this.redisService.get<number>(shiftUserKey);
      //shift_1_1
    }

    let locationStatus: RedisLocationStatus = null;

    switch (requestMarkDto.status_location) {
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

    if (
      requestMarkDto.realDate &&
      moment(requestMarkDto.realDate, 'YYYY-MM-DD', true).isValid()
    ) {
      realDate = requestMarkDto.realDate;
    }

    try {
      markValidator
        .isValidUser()
        .isValidContract()
        .workerDayexists(workerDay, requestMarkDto.mark_type)
        .verifyUserShift(shiftId)
        .haveJustifiedAssistance(workerDayJustificationExists);

      const { errors, outOfContract } = markValidator;

      if (!workerDay) {
        workerDay = {
          date,
          shift_id: shiftId,
          user_id: user.id,
          team_id: user.currentTeam.id,
          tmpKey,
          type: requestMarkDto.mark_type, //Es para cachear
        };
      }

      const payload = {
        data: {
          name: `${user.name} ${user.lastname}`,
          second_id_number: 'TODO',
          id_number: user.id_number,
          org_name: user.currentTeam.name,
          markType: requestMarkDto.mark_type,
          time: requestMarkDto.time,
          location_name: location.name,
          location_address: location.location_address,
          schedule_start: 'ToFill',
          schedule_lunch: 'ToFill',
          schedule_end: 'ToFill',
          subcompany_id_number: user.subcompany.id,
          subcompany_business_name: user.subcompany.business_name,
          subcompany_address: user.subcompany.address,
          date: moment(date),
        },
        mark: {
          tmpKey,
          time: requestMarkDto.time,
          photo: 'ToFill',
          latitude: requestMarkDto.latitude,
          longitude: requestMarkDto.longitude,
          mark_type_id: markType.id,
          location_id: location.id,
          worker_day_id: null,
          shift_id: shiftId,
          date: realDate,
          data: 'ToFillFromDataObject',
          crypt_data: 'ToFillEncryptedDataObject',
          location_status_id: locationStatus.id,
          source: requestMarkDto.source || null,
          management_center_id: requestMarkDto.management_center_id || null,
          errors,
          valid: errors.length ? false : true,
          device_time: requestMarkDto.time,
          use_service: false,
          service_time: null,
          time_service_alert: false,
        },
        workerDay,
        metadata: {
          outOfContract,
        },
      };

      const { location_name } = user.currentTeam.country;
      this.validateAndSendToQueue(location_name, payload);
    } catch (ex) {
      console.log(ex);
    }
    return true;
  }

  async validateAndSendToQueue(
    location_name: string,
    payload: Record<string, any>,
  ) {
    const result = await this.abstractApiService.getTime(location_name);

    if (result) {
      const [, time] = result.datetime.split(' ');
      const deviceTime = payload.data.time;

      payload.mark.use_service = true;
      payload.mark.service_time = time;
      payload.mark.time_service_alert = diffInMinutes(deviceTime, time) > 15;
    }
    console.log('Sending to Rabbit');
    this.client.emit(MARK_PATTERN, payload);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async executeCheckpointMark(requestMarkDto: RequestMarkDto, user: User) {}

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
