import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/accounts/infra/database/database.module';
import { AuthModule } from '../userClient/auth/auth.module';
import { GetStatementUseCase } from 'src/accounts/application/userClient/extract/GetStatementUseCase';
import { TransactionGateway } from 'src/accounts/core/domain/ports/TransactionGateway';
import { StatementController } from './controllers/statement.controller';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [
    {
      provide: GetStatementUseCase,
      useFactory: (transactionGateway: TransactionGateway) => {
        return new GetStatementUseCase(transactionGateway);
      },
      inject: [TransactionGateway],
    },
  ],
  controllers: [StatementController],
})
export class ExtractModule {}
