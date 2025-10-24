import { HttpException } from "@nestjs/common";

export class InvalidFullNameException extends HttpException {
  constructor(message: string = 'Full name must have at least 3 characters.') {
    super(message, 400);
    this.name = 'InvalidFullNameException';
  }
}
