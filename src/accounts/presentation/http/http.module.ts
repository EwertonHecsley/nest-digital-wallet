import { Module } from '@nestjs/common';
import { UserClientModule } from './userClient/userClient.module';
import { HealthModule } from 'src/accounts/infra/healthCheck/health.module';

@Module({
  imports: [UserClientModule, HealthModule],
  exports: [UserClientModule, HealthModule],
})
export class HttpModule {}
