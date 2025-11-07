import { Controller, Get, HttpCode, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ListUserClientsUseCase } from 'src/accounts/application/userClient/useCase/List';
import { UserClientPresenter } from '../presenter/UserClientPresenter';

@Controller('userClient')
export class ListUserClientController {
  constructor(
    private readonly listUserClientsUseCase: ListUserClientsUseCase,
  ) {}

  @Get()
  @HttpCode(200)
  async handler(
    @Query('page') _page,
    @Query('limit') _limit,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.listUserClientsUseCase.execute({
      page: _page ?? 1,
      limit: _limit ?? 10,
    });

    if (result.isLeft()) {
      const error = result.value;
      response.status(error.getStatus()).json({ message: error.message });
      return;
    }

    const { data, limit, page, total } = result.value;

    response.json({
      message: 'List All Users',
      data: data.map((u) => UserClientPresenter.toHTTP(u)),
      limit,
      page,
      total,
    });
  }
}
