import { TransactionGateway } from 'src/accounts/core/domain/ports/TransactionGateway';

export class GetStatementUseCase {
  constructor(private readonly transactionGateway: TransactionGateway) {}

  async execute(userId: string) {
    const transactions = await this.transactionGateway.findByUserId(userId);

    return transactions.map((tx) => ({
      type: tx.type,
      amount: tx.amountInCents / 100,
      relatedUserId: tx.relatedUserId,
      date: tx.createdAt,
    }));
  }
}
