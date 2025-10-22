import { Module } from '@nestjs/common';
import { DrizzleService } from './drizzle.service';
import { UserClientGateway } from 'src/accounts/core/domain/ports/UserClientGateway';
import { UserClientRepository } from '../repositories/UserClientRepository';

@Module({
  providers: [
    DrizzleService,
    {
      provide: UserClientGateway,
      useClass: UserClientRepository,
    },
  ],
  exports: [DrizzleService, UserClientGateway],
})
export class DrizzleModule {}
