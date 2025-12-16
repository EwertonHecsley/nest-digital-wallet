import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DepositUseClientUseCase } from 'src/accounts/application/userClient/useCase/Deposit';
import { DepositUserClientDto } from './dto/DepositUserClientDto';
import { type AuthUser, CurrentUser } from 'src/shared/decorators/CurrentUser';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('deposit')
export class DepositUserClientController {
  constructor(private readonly depositUseCase: DepositUseClientUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(204)
  async handler(
    @Body() body: DepositUserClientDto,
    @CurrentUser() user: AuthUser,
  ): Promise<void> {
    const { id } = user;
    const { amount } = body;

    const result = await this.depositUseCase.execute(id, amount);

    if (result.isLeft()) {
      throw result.value;
    }

    return;
  }
}
