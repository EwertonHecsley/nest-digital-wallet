import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../userClient/auth/guards/jwt.guard';
import { GetStatementUseCase } from 'src/accounts/application/userClient/extract/GetStatementUseCase';
import { type AuthUser, CurrentUser } from 'src/shared/decorators/CurrentUser';

@Controller('extract')
@UseGuards(JwtAuthGuard)
export class StatementController {
  constructor(private readonly getStatementUseCase: GetStatementUseCase) {}

  @Get()
  async handler(@CurrentUser() user: AuthUser) {
    return this.getStatementUseCase.execute(user.id);
  }
}
