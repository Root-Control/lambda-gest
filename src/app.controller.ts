import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './@redis/redis.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
  ) {}

  @Get('me')
  test() {
    return this.appService.config();
  }

  @Get('get-time')
  getTime(@Query('timezone') timezone: string) {
    return this.appService.getTime(timezone);
  }

  @Get('timezones')
  getTimezones() {
    return this.appService.getTimezones();
  }

  @Post('redis-set')
  redisSet(@Body() body: { key: string; value: string }) {
    this.redisService.set(body.key, body.value);
    return 'Setted';
  }

  @Get('redis-get')
  async redisGet(@Query('key') key: string) {
    console.log(key);
    const res = await this.redisService.get(key);
    console.log(res);
    return this.redisService.get(key);
  }
}
