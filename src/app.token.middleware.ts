import { CustomRequest } from '@common/types/express';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { IJwtConfig } from './config/configuration.interface';

@Injectable()
export class DecodeJwtMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: CustomRequest, res: Response, next: NextFunction) {
    const { privateKey } = this.configService.get<IJwtConfig>('jwt');

    const token = req.headers.authorization;
    if (token) {
      try {
        const decoded = verify(token, privateKey);
        req.user = decoded;
        return next();
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      throw new HttpException('No token provided', HttpStatus.BAD_REQUEST);
    }

    next();
  }
}
