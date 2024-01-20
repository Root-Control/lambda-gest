import { Module } from '@nestjs/common';
import { AbstractApiModule } from './abstract-api';

@Module({
  imports: [AbstractApiModule],
  exports: [AbstractApiModule],
})
export class ThirdPartyServicesModule {}
