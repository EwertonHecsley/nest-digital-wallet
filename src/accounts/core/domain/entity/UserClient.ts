import { Email } from 'src/shared/objectValues/Email';
import { Entity } from '../../generics/Entity';
import { CPF } from 'src/shared/objectValues/CPF';
import { Balance } from 'src/shared/objectValues/Balance';
import { Identity } from '../../generics/Identity';
import { Either, left, right } from 'src/shared/utils/either';
import { InvalidFullNameException } from 'src/shared/exceptions/InvalidFullNameException';
import { InvalidEmailException } from 'src/shared/exceptions/InvalidEmailException';
import { InvalidPasswordException } from 'src/shared/exceptions/InvalidPasswordException';
import { InvalidCpfException } from 'src/shared/exceptions/InvalidCpfException';
import { InvalidBalanceException } from 'src/shared/exceptions/InvalidBalanceException';

type UserClientAttributes = {
  fullName: string;
  email: Email;
  cpf: CPF;
  password: string;
  balance: Balance;
  userType: string;
  createdAt: Date;
};

export class UserClient extends Entity<UserClientAttributes> {
  private constructor(attibutes: UserClientAttributes, id?: Identity) {
    super(attibutes, id);
  }

  static create(attributes: UserClientAttributes, id?: Identity): UserClient {
    return new UserClient(
      { ...attributes, createdAt: attributes.createdAt ?? new Date() },
      id,
    );
  }

  get fullName(): string {
    return this._attributes.fullName;
  }

  get email(): Email {
    return this._attributes.email;
  }

  get cpf(): CPF {
    return this._attributes.cpf;
  }

  get password(): string {
    return this._attributes.password;
  }

  get createdAt(): Date {
    return this._attributes.createdAt;
  }

  get UserType(): string {
    return this._attributes.userType;
  }

  get balance(): Balance {
    return this._attributes.balance;
  }

  changeFullName(
    newFullName: string,
  ): Either<InvalidFullNameException, UserClient> {
    if (!newFullName || newFullName.trim().length < 3) {
      return left(new InvalidFullNameException());
    }
    this._attributes.fullName = newFullName.trim();
    return right(this);
  }

  changeEmail(newEmail: string): Either<InvalidEmailException, UserClient> {
    const emailOrError = Email.create(newEmail);
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailException(emailOrError.value));
    }
    this._attributes.email = emailOrError.value;
    return right(this);
  }

  changePassword(
    newPassword: string,
  ): Either<InvalidPasswordException, UserClient> {
    if (!newPassword || newPassword.length < 4) {
      return left(new InvalidPasswordException());
    }
    this._attributes.password = newPassword;
    return right(this);
  }

  changeCpf(newCpf: string): Either<InvalidCpfException, UserClient> {
    const cpfOrError = CPF.create(newCpf);
    if (cpfOrError.isLeft()) {
      return left(new InvalidCpfException(cpfOrError.value));
    }
    this._attributes.cpf = cpfOrError.value;
    return right(this);
  }

  addFunds(ammount: number): Either<InvalidBalanceException, UserClient> {
    if (ammount <= 0) {
      return left(
        new InvalidBalanceException('Amount to add must be greater than zero.'),
      );
    }
    const newBalanceOrError = this._attributes.balance.add(ammount);
    if (newBalanceOrError.isLeft()) {
      return left(newBalanceOrError.value);
    }
    this._attributes.balance = newBalanceOrError.value;
    return right(this);
  }

  makeTransfer(
    ammount: number,
    destinationUser: UserClient,
  ): Either<InvalidBalanceException, true> {
    const newSenderBalanceOrError = this._attributes.balance.subtract(ammount);
    if (newSenderBalanceOrError.isLeft()) {
      return left(newSenderBalanceOrError.value);
    }
    const newDestinationBalanceOrError =
      destinationUser._attributes.balance.add(ammount);
    if (newDestinationBalanceOrError.isLeft()) {
      this._attributes.balance = this._attributes.balance.add(ammount)
        .value as Balance;
      return left(newDestinationBalanceOrError.value);
    }
    this._attributes.balance = newSenderBalanceOrError.value;
    destinationUser._attributes.balance = newDestinationBalanceOrError.value;
    return right(true);
  }
}
