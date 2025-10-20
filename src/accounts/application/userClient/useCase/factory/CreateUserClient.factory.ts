import { UserClient } from 'src/accounts/core/domain/entity/UserClient';
import { InvalidBalanceException } from 'src/shared/exceptions/InvalidBalanceException';
import { InvalidCpfException } from 'src/shared/exceptions/InvalidCpfException';
import { InvalidEmailException } from 'src/shared/exceptions/InvalidEmailException';
import { Balance } from 'src/shared/objectValues/Balance';
import { CPF } from 'src/shared/objectValues/CPF';
import { Email } from 'src/shared/objectValues/Email';
import { Either, left, right } from 'src/shared/utils/either';

export type UserClientRequest = {
  fullName: string;
  email: string;
  cpf: string;
  password: string;
};

export class UserClientFactory {
  static create(
    data: UserClientRequest,
  ): Either<
    InvalidEmailException | InvalidCpfException | InvalidBalanceException,
    UserClient
  > {
    const buildEmail = Email.create(data.email);
    if (buildEmail.isLeft())
      return left(new InvalidEmailException(buildEmail.value));

    const buildCpf = CPF.create(data.cpf);
    if (buildCpf.isLeft()) return left(new InvalidCpfException(buildCpf.value));

    const buildBalance = Balance.createFromReal(0);
    if (buildBalance.isLeft()) return left(buildBalance.value);

    const userClient = UserClient.create({
      fullName: data.fullName,
      email: buildEmail.value,
      cpf: buildCpf.value,
      password: data.password,
      balance: buildBalance.value,
      userType: 'common',
      createdAt: new Date(),
    });

    return right(userClient);
  }
}
