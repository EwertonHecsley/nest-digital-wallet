import { PasswordHashGateway } from 'src/accounts/core/domain/ports/PasswordHashGateway';
import { UserClientGateway } from 'src/accounts/core/domain/ports/UserClientGateway';
import {
  UserClientFactory,
  UserClientRequest,
} from './factory/CreateUserClient.factory';
import { Either, left, right } from 'src/shared/utils/either';
import { BadRequestException } from '@nestjs/common';
import { InvalidEmailException } from 'src/shared/exceptions/InvalidEmailException';
import { InvalidCpfException } from 'src/shared/exceptions/InvalidCpfException';
import { InvalidBalanceException } from 'src/shared/exceptions/InvalidBalanceException';
import { UserClient } from 'src/accounts/core/domain/entity/UserClient';

export class CreateUseClientUseCase {
  constructor(
    private readonly userClientGateway: UserClientGateway,
    private readonly passwordHashGateway: PasswordHashGateway,
  ) {}

  async execute(
    data: UserClientRequest,
  ): Promise<
    Either<
      | BadRequestException
      | InvalidEmailException
      | InvalidCpfException
      | InvalidBalanceException,
      UserClient
    >
  > {
    const { cpf, email } = data;

    const emailExists = await this.userClientGateway.findByEmail(email);
    if (emailExists)
      return left(new BadRequestException('Email already exists.'));

    const cpfExists = await this.userClientGateway.findByCpf(cpf);
    if (cpfExists) return left(new BadRequestException('CPF already exists.'));

    const createUserOrError = UserClientFactory.create(data);
    if (createUserOrError.isLeft()) return left(createUserOrError.value);

    const user = createUserOrError.value;
    const passwordHash = await this.passwordHashGateway.hash(user.password);

    const transformPassworOrError = user.changePassword(passwordHash);
    if (transformPassworOrError.isLeft())
      return left(transformPassworOrError.value);

    const result = await this.userClientGateway.create(user);
    return right(result);
  }
}
