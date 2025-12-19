import { NotFoundException } from '@nestjs/common';
import { TransactionGateway } from 'src/accounts/core/domain/ports/TransactionGateway';
import { UserClientGateway } from 'src/accounts/core/domain/ports/UserClientGateway';

export class GetStatementUseCase {
  constructor(
    private readonly transactionGateway: TransactionGateway,
    private readonly userClientGateway: UserClientGateway,
  ) {}

  async execute(userId: string) {
    const [transactions, user] = await Promise.all([
      this.transactionGateway.findByUserId(userId),
      this.userClientGateway.findById(userId),
    ]);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      balance: user.balance.valueAsReal,
      transactions: transactions.map((tx) => ({
        type: tx.type,
        amount: tx.amountInCents, //Vou deixar em reais para facilitar os testes
        relatedUserId: tx.relatedUserId,
        date: tx.createdAt,
      })),
    };
  }
}
