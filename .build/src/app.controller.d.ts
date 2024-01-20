import { AppService } from './app.service';
import { RedisService } from './@redis/redis.service';
export declare class AppController {
    private readonly appService;
    private readonly redisService;
    constructor(appService: AppService, redisService: RedisService);
    test(): {
        port: number;
        redis: import("./config/configuration.interface").IRedis;
        jwt: import("./config/configuration.interface").IJwtConfig;
        abstract: import("./config/configuration.interface").IAbstractApi;
    };
    getTime(timezone: string): {
        utc: string;
        tzTime: string;
    };
    getTimezones(): string[];
    redisSet(body: {
        key: string;
        value: string;
    }): string;
    redisGet(key: string): Promise<unknown>;
}
