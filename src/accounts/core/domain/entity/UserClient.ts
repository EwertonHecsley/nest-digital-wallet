import { Email } from 'src/shared/objectValues/Email';
import { Entity } from '../../generics/Entity';
import { CPF } from 'src/shared/objectValues/CPF';
import { Balance } from 'src/shared/objectValues/Balance';
import { Identity } from '../../generics/Identity';

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

  get fullName():string{
    return this._attributes.fullName;
  }

  get email():Email{
    return this._attributes.email;
  }

  get cpf():CPF{
    return this._attributes.cpf;
  }

  get password():string{
    return this._attributes.password;
  }

  get createdAt():Date{
    return this._attributes.createdAt;
  }

  get UserType():string{
    return this._attributes.userType;
  }
}
