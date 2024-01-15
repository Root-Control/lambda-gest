import { Injectable } from '@nestjs/common';
import { utc, tz } from 'moment-timezone';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTime(timeZone: string) {
    return {
      utc: utc().format(),
      tzTime: tz(timeZone).format(),
    };
  }

  getTimezones() {
    return tz.names();
  }
}
