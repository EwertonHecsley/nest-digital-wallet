import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserClient } from 'src/accounts/core/domain/entity/UserClient';
import { PasswordHashService } from 'src/accounts/infra/services/PasswordHash.service';
import { UserClientRepository } from 'src/accounts/infra/database/repositories/UserClientRepository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userClientGateway: UserClientRepository,
    private readonly jwtService: JwtService,
    private readonly hashService: PasswordHashService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserClient | null> {
    const user = await this.userClientGateway.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas.');

    const passwordMatch = await this.hashService.compare(
      password,
      user.password,
    );
    if (!passwordMatch)
      throw new UnauthorizedException('Credenciais inválidas.');

    return user;
  }

  async getToken(user: UserClient): Promise<string> {
    const payload = { sub: user.identity.id, email: user.email.toValue };
    return this.jwtService.signAsync(payload);
  }
}
