import { ConfigService } from '@nestjs/config';
import { IAbstractApi, IJwtConfig, IRedis } from './config/configuration.interface';
export declare class AppService {
    private readonly configService;
    constructor(configService: ConfigService);
    config(): {
        port: number;
        redis: IRedis;
        jwt: IJwtConfig;
        abstract: IAbstractApi;
    };
    getTime(timeZone: string): {
        utc: string;
        tzTime: string;
    };
    getTimezones(): string[];
}
