import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { utc, tz } from 'moment-timezone';
import {
  IAbstractApi,
  IJwtConfig,
  IRedis,
} from './config/configuration.interface';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  config() {
    const port = this.configService.get<number>('port');
    const redis = this.configService.get<IRedis>('redis');
    const jwt = this.configService.get<IJwtConfig>('jwt');
    const abstract = this.configService.get<IAbstractApi>('abstract');

    return { port, redis, jwt, abstract };
  }

  getTime(timeZone: string) {
    return {
      utc: utc().format(),
      tzTime: tz(timeZone).format(),
    };
  }

  getTimezones() {
    return tz.names();
  }
}
