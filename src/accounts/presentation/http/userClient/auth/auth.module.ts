import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserClientRepository } from 'src/accounts/infra/database/repositories/UserClientRepository';
import { PasswordHashService } from 'src/accounts/infra/services/PasswordHash.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { DrizzleService } from 'src/accounts/infra/database/drizzle/drizzle.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '5min' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [
    UserClientRepository,
    AuthService,
    DrizzleService,
    PasswordHashService,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
