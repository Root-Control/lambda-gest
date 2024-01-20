import { CustomRequest } from '@common/types/express';
import { NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, NextFunction } from 'express';
export declare class DecodeJwtMiddleware implements NestMiddleware {
    private readonly configService;
    constructor(configService: ConfigService);
    use(req: CustomRequest, res: Response, next: NextFunction): void;
}
