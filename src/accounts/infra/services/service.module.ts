import { Module } from '@nestjs/common';
import { PasswordHashGateway } from 'src/accounts/core/domain/ports/PasswordHashGateway';
import { PasswordHashService } from './PasswordHash.service';

@Module({
  providers: [
    {
      provide: PasswordHashGateway,
      useClass: PasswordHashService,
    },
  ],
  exports: [PasswordHashGateway],
})
export class ServiceModule {}
