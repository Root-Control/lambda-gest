import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { TimeResponse } from './abstract-api.types';
export declare class AbstractApiService {
    private readonly httpService;
    private readonly configService;
    constructor(httpService: HttpService, configService: ConfigService);
    getTime(timezone: string): Promise<TimeResponse>;
}
