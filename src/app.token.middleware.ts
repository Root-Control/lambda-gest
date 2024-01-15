import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class DecodeJwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (token) {
      try {
        const secretOrPublicKey =
          'f4lCWCjLeS12XdjqXW3x4IkhgRQkk08iNeEbEgF4pK8EaPjQqOqCZgABrlc8zxBA';

        const decoded = jwt.verify(token, secretOrPublicKey);
        req['user'] = decoded;
        console.log(req['user']);
        next();
        return true;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      throw new HttpException('No token provided', HttpStatus.BAD_REQUEST);
    }

    next();
  }
}
