import { UserClient } from '../entity/UserClient';

export abstract class UserClientGateway {
  abstract create(entity: UserClient): Promise<UserClient>;
  abstract findByEmail(email: string): Promise<UserClient | null>;
  abstract findByCpf(cpf: string): Promise<UserClient | null>;
}
