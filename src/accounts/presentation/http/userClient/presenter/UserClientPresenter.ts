import { UserClient } from 'src/accounts/core/domain/entity/UserClient';

export class UserClientPresenter {
  static toHTTP(userClient: UserClient) {
    return {
      id: userClient.identity.id,
      name: userClient.fullName,
      email: userClient.email.toValue,
      type: userClient.UserType,
      createdAt: userClient.createdAt.toLocaleDateString('pt-BR'),
    };
  }
}
