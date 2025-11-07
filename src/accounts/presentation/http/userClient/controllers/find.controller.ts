import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { FindUserClientUseCase } from 'src/accounts/application/userClient/useCase/Find';
import { UserClientPresenter } from '../presenter/UserClientPresenter';
import { validate as isUuid } from 'uuid';

@Controller('userClient')
export class FindUserClientController {
  constructor(private readonly findUserClientUseCase: FindUserClientUseCase) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async handler(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const result = await this.findUserClientUseCase.execute({ id });

    if (result.isLeft()) {
      throw result.value;
    }

    return {
      message: 'User found successfully',
      user: UserClientPresenter.toHTTP(result.value),
    };
  }
}
