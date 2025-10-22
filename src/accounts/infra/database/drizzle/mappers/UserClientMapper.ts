import { UserClient } from 'src/accounts/core/domain/entity/UserClient';
import { userClient as UserTable } from '../schema';
import { InferInsertModel } from 'drizzle-orm';
import { Identity } from 'src/accounts/core/generics/Identity';

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

  static toDomain(raw: any): UserClient {
    return UserClient.create(
      {
        fullName: raw.fullName,
        email: raw.email,
        cpf: raw.cpf,
        password: raw.password,
        balance: raw.balance,
        userType: raw.userType,
        createdAt: raw.createdAt,
      },
      new Identity(raw.id),
    );
  }
}
