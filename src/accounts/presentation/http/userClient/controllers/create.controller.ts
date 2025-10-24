import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CreateUseClientUseCase } from 'src/accounts/application/userClient/useCase/Create';
import { CreateUserClientDTO } from './dto/CreateUserClientDto';
import { UserClientPresenter } from '../presenter/UserClientPresenter';

@Controller('userClient')
export class CreateUserClientController {
  constructor(
    private readonly createUserClientUseCase: CreateUseClientUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async handler(
    @Body() data: CreateUserClientDTO,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.createUserClientUseCase.execute(data);
    if (result.isLeft()) {
      const { message } = result.value;
      response.status(result.value.getStatus()).json({ message });
      return;
    }

    const user = result.value;
    response.json({
      message: 'UserClient created sucessfuly.',
      user: UserClientPresenter.toHTTP(user),
    });
  }
}
