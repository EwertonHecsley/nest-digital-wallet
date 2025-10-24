import { HttpException } from "@nestjs/common";

export class InvalidEmailException extends HttpException {
  constructor(message: string = 'Invalid Email.') {
    super(message, 400);
    this.name = 'InvalidEmail';
  }
}
