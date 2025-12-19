import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Transaction } from 'src/accounts/core/domain/entity/Transaction';
import { UserClient } from 'src/accounts/core/domain/entity/UserClient';
import { TransactionGateway } from 'src/accounts/core/domain/ports/TransactionGateway';
import { UserClientGateway } from 'src/accounts/core/domain/ports/UserClientGateway';
import { TransactionType } from 'src/shared/enums/TransactionType';
import { Either, right } from 'src/shared/utils/either';

type TransferInput = {
  fromUserId: string;
  toUserId: string;
  amount: number;
};

type TransferOutput = {
  fromBalance: number;
  toBalance: number;
};

export class TransferUserClientUseCase {
  constructor(
    private readonly userClientGateway: UserClientGateway,
    private readonly transactionGateway: TransactionGateway,
  ) {}

  async execute(
    input: TransferInput,
  ): Promise<Either<NotFoundException | BadRequestException, TransferOutput>> {
    this.validateInput(input);

    const sender = await this.getUserClientOrThrow(input.fromUserId, 'Sender');
    const receiver = await this.getUserClientOrThrow(
      input.toUserId,
      'Receiver',
    );

    this.executeTransfer(sender, receiver, input.amount);

    await this.persistChanges(sender, receiver);
    await this.registerTransaction(sender, receiver, input.amount);

    return right({
      fromBalance: sender.balance.valueAsReal,
      toBalance: receiver.balance.valueAsReal,
    });
  }

  private validateInput(input: TransferInput): void {
    const { fromUserId, toUserId, amount } = input;

    if (fromUserId === toUserId) {
      throw new BadRequestException(
        'fromUserId and toUserId cannot be the same.',
      );
    }
    if (amount <= 0) {
      throw new BadRequestException(
        'Transfer amount must be greater than zero.',
      );
    }
  }

  private async getUserClientOrThrow(
    userId: string,
    label: 'Sender' | 'Receiver',
  ) {
    const userClient = await this.userClientGateway.findById(userId);
    if (!userClient) {
      throw new NotFoundException(`${label} with ID ${userId} not found.`);
    }
    return userClient;
  }

  private executeTransfer(
    sender: UserClient,
    receiver: UserClient,
    amount: number,
  ) {
    const result = sender.makeTransfer(amount, receiver);
    if (result.isLeft()) {
      throw new BadRequestException(result.value.message);
    }
  }

  private async persistChanges(...userClients: UserClient[]) {
    for (const userClient of userClients) {
      await this.userClientGateway.save(userClient);
    }
  }

  private async registerTransaction(
    sender: UserClient,
    receiver: UserClient,
    amount: number,
  ) {
    const amountValue = amount;
    await this.transactionGateway.create(
      Transaction.create({
        userId: sender.identity.id,
        amountInCents: amountValue,
        type: TransactionType.TRANSFER_SENT,
        relatedUserId: receiver.identity.id,
        createdAt: new Date(),
      }),
    );

    await this.transactionGateway.create(
      Transaction.create({
        userId: receiver.identity.id,
        amountInCents: amountValue,
        type: TransactionType.TRANSFER_RECEIVED,
        relatedUserId: sender.identity.id,
        createdAt: new Date(),
      }),
    );
  }
}
