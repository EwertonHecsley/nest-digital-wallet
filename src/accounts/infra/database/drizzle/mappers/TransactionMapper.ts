import { Transaction } from 'src/accounts/core/domain/entity/Transaction';
import { transactions as TransactionsTable } from '../schema';
import { InferInsertModel } from 'drizzle-orm';
import { TransactionType } from 'src/shared/enums/TransactionType';
import { Identity } from 'src/accounts/core/generics/Identity';

export class TransactionMapper {
  static toDatabase(
    entity: Transaction,
  ): InferInsertModel<typeof TransactionsTable> {
    return {
      id: entity.identity.id,
      userId: entity.userId,
      relatedUserId: entity.relatedUserId,
      type: entity.type,
      amountInCents: entity.amountInCents,
      createdAt: entity.createdAt,
    };
  }

  static toDomain(
    raw: InferInsertModel<typeof TransactionsTable>,
  ): Transaction {
    return Transaction.create(
      {
        userId: raw.userId,
        amountInCents: raw.amountInCents,
        type: raw.type as TransactionType,
        relatedUserId: raw.relatedUserId!,
        createdAt: raw.createdAt!,
      },
      new Identity(raw.id),
    );
  }
}
