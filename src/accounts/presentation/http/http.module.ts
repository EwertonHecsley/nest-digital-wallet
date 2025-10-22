import { Module } from '@nestjs/common';
import { UserClientModule } from './userClient/userClient.module';

@Module({
  imports: [UserClientModule],
  exports: [UserClientModule],
})
export class HttpModule {}
