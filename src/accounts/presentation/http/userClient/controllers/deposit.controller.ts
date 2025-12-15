import { Body, Controller, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { DepositUseClientUseCase } from 'src/accounts/application/userClient/useCase/Deposit';
import { DepositUserClientDto } from './dto/DepositUserClientDto';
import type { Response } from 'express';
import { type AuthUser, CurrentUser } from 'src/shared/decorators/CurrentUser';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('deposit')
export class DepositUserClientController {
  constructor(private readonly depositUseCase: DepositUseClientUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(200)
  async handler(
    @Body() body: DepositUserClientDto,
    @CurrentUser() user: AuthUser,
    @Res() response: Response,
  ): Promise<void> {
    const { id } = user;
    const { amount } = body;

    const result = await this.depositUseCase.execute(id, amount);

    if (result.isLeft()) {
      throw result.value;
    }

    response.json({
      message: 'Deposit completed successfully.',
    });
  }
}
