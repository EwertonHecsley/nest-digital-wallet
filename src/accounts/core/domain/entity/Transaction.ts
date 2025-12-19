import { TransactionType } from 'src/shared/enums/TransactionType';
import { Entity } from '../../generics/Entity';
import { Identity } from '../../generics/Identity';

type TransactionAttributes = {
  userId: string;
  relatedUserId?: string;
  type: TransactionType;
  amountInCents: number;
  createdAt: Date;
};

export class Transaction extends Entity<TransactionAttributes> {
  private constructor(attrs: TransactionAttributes, id?: Identity) {
    super(attrs, id);
  }

  static create(attrs: TransactionAttributes, id?: Identity) {
    return new Transaction(
      { ...attrs, createdAt: attrs.createdAt ?? new Date() },
      id,
    );
  }

  get type() {
    return this._attributes.type;
  }

  get amountInCents() {
    return this._attributes.amountInCents;
  }

  get createdAt() {
    return this._attributes.createdAt;
  }

  get relatedUserId() {
    return this._attributes.relatedUserId;
  }

  get userId() {
    return this._attributes.userId;
  }
}
