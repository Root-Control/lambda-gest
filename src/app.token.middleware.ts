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
import { RedisService } from './@redis/redis.service';
import { RedisUserDetails } from '@common/global-types/types';

@Injectable()
export class DecodeJwtMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const { privateKey } = this.configService.get<IJwtConfig>('jwt');

    const [, token] = req.headers.authorization.split(' ');
    if (token) {
      try {
        const { userId } = verify(token, privateKey);
        const details = await this.redisService.get<RedisUserDetails>(
          `user-${userId}`,
        );

        if (!details) {
          return res.status(HttpStatus.UNAUTHORIZED).send('No user found');
        }

        const { user, currentTeam, background, subcompanies } = details;

        req.user = {
          ...user,
          currentTeam,
          background,
          subcompanies,
        };
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
