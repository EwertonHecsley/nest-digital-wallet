import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/accounts/infra/database/database.module';
import { AuthModule } from '../userClient/auth/auth.module';
import { GetStatementUseCase } from 'src/accounts/application/userClient/extract/GetStatementUseCase';
import { TransactionGateway } from 'src/accounts/core/domain/ports/TransactionGateway';
import { StatementController } from './controllers/statement.controller';
import { UserClientGateway } from 'src/accounts/core/domain/ports/UserClientGateway';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [
    {
      provide: GetStatementUseCase,
      useFactory: (
        transactionGateway: TransactionGateway,
        userClientGateway: UserClientGateway,
      ) => {
        return new GetStatementUseCase(transactionGateway, userClientGateway);
      },
      inject: [TransactionGateway, UserClientGateway],
    },
  ],
  controllers: [StatementController],
})
export class ExtractModule {}
