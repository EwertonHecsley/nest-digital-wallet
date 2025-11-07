import { NotFoundException } from '@nestjs/common';
import { UserClient } from 'src/accounts/core/domain/entity/UserClient';
import { UserClientGateway } from 'src/accounts/core/domain/ports/UserClientGateway';
import { Either, left, right } from 'src/shared/utils/either';

type RequestUserClient = {
  id: string;
};

export class FindUserClientUseCase {
  constructor(private readonly userClientGateway: UserClientGateway) {}

  async execute({
    id,
  }: RequestUserClient): Promise<Either<NotFoundException, UserClient>> {
    const user = await this.userClientGateway.findById(id);
    if (!user)
      return left(new NotFoundException(`User with id: ${id} not found.`));

    return right(user);
  }
}
