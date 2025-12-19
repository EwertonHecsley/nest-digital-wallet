import { TransactionGateway } from 'src/accounts/core/domain/ports/TransactionGateway';
import { DrizzleService } from '../drizzle/drizzle.service';
import { Transaction } from 'src/accounts/core/domain/entity/Transaction';
import { TransactionMapper } from '../drizzle/mappers/TransactionMapper';
import { transactions } from '../drizzle/schema';
import { desc, eq } from 'drizzle-orm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionRepository implements TransactionGateway {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(transaction: Transaction): Promise<Transaction> {
    const data = TransactionMapper.toDatabase(transaction);
    const result = await this.drizzle.db
      .insert(transactions)
      .values(data)
      .returning();
    return TransactionMapper.toDomain(result[0]);
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    const result = await this.drizzle.db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.createdAt));
    return result.map(TransactionMapper.toDomain);
  }
}
