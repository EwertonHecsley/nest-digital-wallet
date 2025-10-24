import { InternalServerErrorException, Logger } from '@nestjs/common';
import { UserClient } from 'src/accounts/core/domain/entity/UserClient';
import {
  FindAllParams,
  PaginatedResponse,
  UserClientGateway,
} from 'src/accounts/core/domain/ports/UserClientGateway';
import { Either, left, right } from 'src/shared/utils/either';

type ResponseClient = Either<
  InternalServerErrorException,
  PaginatedResponse<UserClient>
>;

export class ListUserClientsUseCase {
  constructor(private readonly userClientGateway: UserClientGateway) {}

  async execute(params: FindAllParams): Promise<ResponseClient> {
    try {
      const result = await this.userClientGateway.listAll(params);
      return right(result);
    } catch (error: any) {
      Logger.error('Error Fetching UserClient.', error);
      return left(new InternalServerErrorException());
    }
  }
}
