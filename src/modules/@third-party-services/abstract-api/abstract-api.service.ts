import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { IAbstractApi } from 'src/config/configuration.interface';
import { TimeResponse } from './abstract-api.types';

@Injectable()
export class AbstractApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getTime(timezone: string) {
    const { apiKey, endpoint } =
      this.configService.get<IAbstractApi>('abstract');
    const url = `${endpoint}/current_time?api_key=${apiKey}&location=${timezone}`;

    const request$ = this.httpService.get<TimeResponse>(url).pipe(
      map((res) => res.data),
      catchError(() => of(null)),
    );
    return lastValueFrom(request$);
  }
}
