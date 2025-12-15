import { Module } from '@nestjs/common';
import { CreateUseClientUseCase } from 'src/accounts/application/userClient/useCase/Create';
import { PasswordHashGateway } from 'src/accounts/core/domain/ports/PasswordHashGateway';
import { UserClientGateway } from 'src/accounts/core/domain/ports/UserClientGateway';
import { DatabaseModule } from 'src/accounts/infra/database/database.module';
import { ServiceModule } from 'src/accounts/infra/services/service.module';
import { CreateUserClientController } from './controllers/create.controller';
import { ListUserClientsUseCase } from 'src/accounts/application/userClient/useCase/List';
import { ListUserClientController } from './controllers/list.controller';
import { FindUserClientUseCase } from 'src/accounts/application/userClient/useCase/Find';
import { FindUserClientController } from './controllers/find.controller';
import { DeleteUserClientUseCase } from 'src/accounts/application/userClient/useCase/Delete';
import { DeleteUserClientController } from './controllers/delete.controller';
import { UpdateUserClientUseCase } from 'src/accounts/application/userClient/useCase/Update';
import { UpdateUserClientController } from './controllers/updte.controller';
import { AuthModule } from './auth/auth.module';
import { DepositUseClientUseCase } from 'src/accounts/application/userClient/useCase/Deposit';
import { DepositUserClientController } from './controllers/deposit.controller';

@Module({
  imports: [DatabaseModule, ServiceModule, AuthModule],
  providers: [
    {
      provide: CreateUseClientUseCase,
      useFactory: (
        userClientGateway: UserClientGateway,
        passwordHashGateway: PasswordHashGateway,
      ) => {
        return new CreateUseClientUseCase(
          userClientGateway,
          passwordHashGateway,
        );
      },
      inject: [UserClientGateway, PasswordHashGateway],
    },
    {
      provide: ListUserClientsUseCase,
      useFactory: (userClientGateway: UserClientGateway) => {
        return new ListUserClientsUseCase(userClientGateway);
      },
      inject: [UserClientGateway],
    },
    {
      provide: FindUserClientUseCase,
      useFactory: (userClientGateway: UserClientGateway) => {
        return new FindUserClientUseCase(userClientGateway);
      },
      inject: [UserClientGateway],
    },
    {
      provide: DeleteUserClientUseCase,
      useFactory: (userclientGateway: UserClientGateway) => {
        return new DeleteUserClientUseCase(userclientGateway);
      },
      inject: [UserClientGateway],
    },
    {
      provide: UpdateUserClientUseCase,
      useFactory: (
        userClientGateway: UserClientGateway,
        passwordHashGateway: PasswordHashGateway,
      ) => {
        return new UpdateUserClientUseCase(
          userClientGateway,
          passwordHashGateway,
        );
      },
      inject: [UserClientGateway, PasswordHashGateway],
    },
    {
      provide: DepositUseClientUseCase,
      useFactory: (userClientGateway: UserClientGateway) => {
        return new DepositUseClientUseCase(userClientGateway);
      },
      inject: [UserClientGateway],
    },
  ],
  controllers: [
    CreateUserClientController,
    ListUserClientController,
    FindUserClientController,
    DeleteUserClientController,
    UpdateUserClientController,
    DepositUserClientController,
  ],
})
export class UserClientModule {}
