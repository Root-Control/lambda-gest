import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { utc, tz } from 'moment-timezone';
import { lastValueFrom, map } from 'rxjs';
import { IAbstractApi } from 'src/config/configuration.interface';

@Injectable()
export class AbstractApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  getTime(timezone: string) {
    const { apiKey, endpoint } = this.configService.get<IAbstractApi>('abstract');
    const url = `${endpoint}/current_time?api_key=${apiKey}&location=${timezone}`;

    const request$ = this.httpService.get(url).pipe(map(res => res.data));
    return lastValueFrom(request$);
  }
}
