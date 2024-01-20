import Redis from 'ioredis';
import { DynamicModule } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisModuleAsyncOptions } from './redis.interface';
export declare class RedisModule {
    static forRoot(params: {
        identifier: string;
        host: string | undefined;
        port: number;
    }): {
        module: typeof RedisModule;
        providers: (typeof RedisService | {
            provide: string;
            useValue: Redis;
        })[];
        exports: (typeof RedisService | {
            provide: string;
            useValue: Redis;
        })[];
        global: boolean;
    };
    static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule;
}
