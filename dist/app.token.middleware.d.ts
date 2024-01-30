import { CustomRequest } from './@common/types/express';
import { NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, NextFunction } from 'express';
import { RedisService } from './@redis/redis.service';
export declare class DecodeJwtMiddleware implements NestMiddleware {
    private readonly configService;
    private readonly redisService;
    constructor(configService: ConfigService, redisService: RedisService);
    use(req: CustomRequest, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
