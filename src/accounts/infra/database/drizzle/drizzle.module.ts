import { Module } from '@nestjs/common';
import { DrizzleService } from './drizzle.service';
import { UserClientGateway } from 'src/accounts/core/domain/ports/UserClientGateway';
import { UserClientRepository } from '../repositories/UserClientRepository';
import { TransactionGateway } from 'src/accounts/core/domain/ports/TransactionGateway';
import { TransactionRepository } from '../repositories/TransactionRepository';

@Module({
  providers: [
    DrizzleService,
    {
      provide: UserClientGateway,
      useClass: UserClientRepository,
    },
    {
      provide: TransactionGateway,
      useClass: TransactionRepository,
    },
  ],
  exports: [DrizzleService, UserClientGateway, TransactionGateway],
})
export class DrizzleModule {}
