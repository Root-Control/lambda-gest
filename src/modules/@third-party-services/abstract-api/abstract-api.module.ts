import { Module } from '@nestjs/common';
import { AbstractApiService } from './abstract-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [AbstractApiService],
  exports: [AbstractApiService]
})
export class AbstractApiModule {}
