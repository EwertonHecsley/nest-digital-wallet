import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Request, Response } from 'express';
import { UserClientPresenter } from '../presenter/UserClientPresenter';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(
    @Body() body: LoginDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const { email, password } = body;
    const result = await this.authService.validateUser(email, password);
    if (!result) {
      return response.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = await this.authService.getToken(result);

    const { password:_, ...user } = result

    request.user = user;

    return response.status(HttpStatus.ACCEPTED).json({
      user:UserClientPresenter.toHTTP(result),
      accessToken,
    });
  }
}
