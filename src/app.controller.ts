import { Controller, Get, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  test(@Req() request): string {
    return request.user;
  }

  @Get('get-time')
  getTime(@Query('timezone') timezone: string) {
    return this.appService.getTime(timezone);
  }

  @Get('timezones')
  getTimezones() {
    return this.appService.getTimezones();
  }
}
