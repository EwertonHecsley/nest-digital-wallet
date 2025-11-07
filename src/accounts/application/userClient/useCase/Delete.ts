import { NotFoundException } from '@nestjs/common';
import { UserClientGateway } from 'src/accounts/core/domain/ports/UserClientGateway';
import { Either, left, right } from 'src/shared/utils/either';

type RequestUserClient = {
  id: string;
};

export class DeleteUserClientUseCase {
  constructor(private readonly userClientGateway: UserClientGateway) {}

  async execute({
    id,
  }: RequestUserClient): Promise<Either<NotFoundException, true>> {
    const user = await this.userClientGateway.findById(id);
    if (!user)
      return left(new NotFoundException(`User not found with ID ${id}.`));

    await this.userClientGateway.delete(id);

    return right(true);
  }
}
