import { Transaction } from '../entity/Transaction';

export abstract class TransactionGateway {
  abstract create(transaction: Transaction): Promise<Transaction>;
  abstract findByUserId(userId: string): Promise<Transaction[]>;
}
