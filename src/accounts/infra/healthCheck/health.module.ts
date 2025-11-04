import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from '../../presentation/http/healthCheck/health.controller';
import { DatabaseHealthIndicator } from './DatabaseHealthIndicator';

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle:'pretty'
    }),
    HttpModule],
  controllers:[HealthController],
  providers:[DatabaseHealthIndicator]
})
export class HealthModule {}
