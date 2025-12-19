import { Module } from '@nestjs/common';
import { UserClientModule } from './userClient/userClient.module';
import { HealthModule } from 'src/accounts/infra/healthCheck/health.module';
import { ExtractModule } from './extract/extract.module';

@Module({
  imports: [UserClientModule, HealthModule, ExtractModule],
  exports: [UserClientModule, HealthModule, ExtractModule],
})
export class HttpModule {}
