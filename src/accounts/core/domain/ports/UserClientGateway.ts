import { UserClient } from '../entity/UserClient';

export type FindAllParams = {
  page: number;
  limit: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export abstract class UserClientGateway {
  abstract create(entity: UserClient): Promise<UserClient>;
  abstract findByEmail(email: string): Promise<UserClient | null>;
  abstract findByCpf(cpf: string): Promise<UserClient | null>;
  abstract listAll(
    params: FindAllParams,
  ): Promise<PaginatedResponse<UserClient>>;
}
