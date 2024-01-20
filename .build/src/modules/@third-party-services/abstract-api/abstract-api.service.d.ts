import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class AbstractApiService {
    private readonly httpService;
    private readonly configService;
    constructor(httpService: HttpService, configService: ConfigService);
    getTime(timezone: string): Promise<any>;
}
