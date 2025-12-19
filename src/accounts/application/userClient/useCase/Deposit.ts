import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Transaction } from 'src/accounts/core/domain/entity/Transaction';
import { TransactionGateway } from 'src/accounts/core/domain/ports/TransactionGateway';
import { UserClientGateway } from 'src/accounts/core/domain/ports/UserClientGateway';
import { TransactionType } from 'src/shared/enums/TransactionType';
import { Either, left, right } from 'src/shared/utils/either';

export class DepositUseClientUseCase {
  constructor(
    private readonly userClientGateway: UserClientGateway,
    private readonly transactionGateway: TransactionGateway,
  ) {}

  async execute(
    userId: string,
    amount: number,
  ): Promise<Either<NotFoundException | BadRequestException, true>> {
    const userClient = await this.userClientGateway.findById(userId);
    if (!userClient)
      return left(new NotFoundException('User client not found'));

    const result = userClient.addFunds(amount);
    if (result.isLeft())
      return left(new BadRequestException(result.value.message));

    await this.userClientGateway.save(userClient);
    await this.transactionGateway.create(
      Transaction.create({
        userId: userClient.identity.id,
        amountInCents: amount,
        type: TransactionType.DEPOSIT,
        createdAt: new Date(),
      }),
    );

    return right(true);
  }
}
