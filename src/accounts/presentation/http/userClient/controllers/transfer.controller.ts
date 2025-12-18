import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { TransferUserClientUseCase } from 'src/accounts/application/userClient/useCase/Transfer';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { TransferUserClientDto } from './dto/TransferUserClientDto';
import { type AuthUser, CurrentUser } from 'src/shared/decorators/CurrentUser';

@Controller('transfer')
export class TransferUserClientController {
  constructor(private readonly transferUseCase: TransferUserClientUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(204)
  async handler(
    @Body() body: TransferUserClientDto,
    @CurrentUser() user: AuthUser,
  ): Promise<void> {
    const result = await this.transferUseCase.execute({
      fromUserId: user.id,
      toUserId: body.toUserId,
      amount: body.amount,
    });

    if (result.isLeft()) {
      throw result.value;
    }
  }
}
