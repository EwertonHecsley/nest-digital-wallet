import { HttpException } from "@nestjs/common";

export class InvalidPasswordException extends HttpException {
  constructor(message: string = 'Password invalid.') {
    super(message, 400);
    this.name = 'InvalidPasswordException';
  }
}
