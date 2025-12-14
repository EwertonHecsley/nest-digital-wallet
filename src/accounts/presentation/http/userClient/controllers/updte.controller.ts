import { Body, Controller, HttpCode, Param, Patch, Res, UseGuards } from '@nestjs/common';
import { UpdateUserClientUseCase } from 'src/accounts/application/userClient/useCase/Update';
import { UpdateUserClientDTO } from './dto/UdateUserClientDto';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('userClient')
export class UpdateUserClientController {
  constructor(
    private readonly updateUserClientUseCase: UpdateUserClientUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(204)
  async handler(
    @Param('id') id: string,
    @Body() data: UpdateUserClientDTO,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.updateUserClientUseCase.execute({ id, ...data });

    if (result.isLeft()) {
      throw result.value;
    }

    response.send();
  }
}
