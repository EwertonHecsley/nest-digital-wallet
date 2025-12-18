import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserClientGateway } from 'src/accounts/core/domain/ports/UserClientGateway';
import { Either, left, right } from 'src/shared/utils/either';

export class WithdrawUserClientUseCase {
  constructor(private readonly userClientGateway: UserClientGateway) {}

  async execute(
    userId: string,
    amount: number,
  ): Promise<Either<NotFoundException | BadRequestException, true>> {
    const userClient = await this.userClientGateway.findById(userId);
    if (!userClient) {
      return left(new NotFoundException('User client not found'));
    }

    const withdrawResult = userClient.withdraw(amount);

    if (withdrawResult.isLeft()) {
      return left(new BadRequestException(withdrawResult.value.message));
    }

    await this.userClientGateway.save(userClient);
    return right(true);
  }
}
