import { NotFoundException } from '@nestjs/common';
import { PasswordHashGateway } from 'src/accounts/core/domain/ports/PasswordHashGateway';
import { UserClientGateway } from 'src/accounts/core/domain/ports/UserClientGateway';
import { InvalidEmailException } from 'src/shared/exceptions/InvalidEmailException';
import { Either, left, right } from 'src/shared/utils/either';

type UpdateUserClientUseCaseRequest = {
  id: string;
  fullName?: string;
  email?: string;
  password?: string;
};

export class UpdateUserClientUseCase {
  constructor(
    private readonly userClientGateway: UserClientGateway,
    private readonly passwordHashGateway: PasswordHashGateway,
  ) {}

  async execute(
    data: UpdateUserClientUseCaseRequest,
  ): Promise<Either<InvalidEmailException | NotFoundException, true>> {
    const { id, email, password, fullName } = data;
    const userClient = await this.userClientGateway.findById(id);
    if (!userClient)
      return left(new NotFoundException('User client not found.'));

    if (email) {
      const emailExists = await this.userClientGateway.findByEmail(email);
      if (emailExists && emailExists.identity.id !== id) {
        return left(
          new InvalidEmailException('Email already in use by another user.'),
        );
      }
      const changeEmailOrError = userClient.changeEmail(email);
      if (changeEmailOrError.isLeft()) {
        return left(changeEmailOrError.value);
      }
    }

    if (password) {
      const passwordHash = await this.passwordHashGateway.hash(password);
      const changePasswordOrError = userClient.changePassword(passwordHash);
      if (changePasswordOrError.isLeft()) {
        return left(changePasswordOrError.value);
      }
    }

    if (fullName) {
      const changeFullNameOrError = userClient.changeFullName(fullName);
      if (changeFullNameOrError.isLeft()) {
        return left(changeFullNameOrError.value);
      }
    }

    await this.userClientGateway.save(userClient);

    return right(true);
  }
}
