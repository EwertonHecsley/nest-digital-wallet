import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { AccountsModule } from './accounts/accounts.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    AccountsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
