import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WithdrawUserClientUseCase } from 'src/accounts/application/userClient/useCase/Withdraw';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { WithdrawUserClientDto } from './dto/WithdrawUserClientDto';
import { type AuthUser, CurrentUser } from 'src/shared/decorators/CurrentUser';

@Controller('withdraw')
export class WithdrawUserClientController {
  constructor(
    private readonly withdrawUserClientUseCase: WithdrawUserClientUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(204)
  async handler(
    @Body() body: WithdrawUserClientDto,
    @CurrentUser() user: AuthUser,
  ): Promise<void> {
    const { id } = user;
    const { amount } = body;

    const result = await this.withdrawUserClientUseCase.execute(id, amount);

    if (result.isLeft()) {
      throw result.value;
    }

    return;
  }
}
