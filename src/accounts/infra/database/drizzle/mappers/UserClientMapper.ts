import { UserClient } from 'src/accounts/core/domain/entity/UserClient';
import { userClient as UserTable } from '../schema';
import { InferInsertModel } from 'drizzle-orm';
import { Identity } from 'src/accounts/core/generics/Identity';
import { Email } from 'src/shared/objectValues/Email';
import { InvalidEmailException } from 'src/shared/exceptions/InvalidEmailException';
import { CPF } from 'src/shared/objectValues/CPF';
import { InvalidCpfException } from 'src/shared/exceptions/InvalidCpfException';
import { Balance } from 'src/shared/objectValues/Balance';
import { InvalidBalanceException } from 'src/shared/exceptions/InvalidBalanceException';

export class UserClientMapper {
  static toDatabase(entity: UserClient): InferInsertModel<typeof UserTable> {
    return {
      id: entity.identity.id,
      fullName: entity.fullName,
      email: entity.email.toValue,
      cpf: entity.cpf.toValue,
      password: entity.password,
      balance: entity.balance.valueAsReal,
      userType: entity.UserType,
      createdAt: entity.createdAt,
    };
  }

  static toDomain(raw: InferInsertModel<typeof UserTable>): UserClient {
    const buildEmail = Email.create(raw.email);
    if (buildEmail.isLeft()) throw new InvalidEmailException(buildEmail.value);

    const buildCpf = CPF.create(raw.cpf);
    if (buildCpf.isLeft()) throw new InvalidCpfException(buildCpf.value);

    const buildBalance = Balance.createFromReal(raw.balance!);
    if (buildBalance.isLeft()) throw new InvalidBalanceException();

    return UserClient.create(
      {
        fullName: raw.fullName,
        email: buildEmail.value,
        cpf: buildCpf.value,
        password: raw.password,
        balance: buildBalance.value,
        userType: raw.userType,
        createdAt: raw.createdAt!,
      },
      new Identity(raw.id),
    );
  }
}
