import { HttpException } from "@nestjs/common";
export class InvalidBalanceException extends HttpException {
    constructor(message: string = 'Invalid Balance.') {
    super(message, 400);
    this.name = 'InvalidBalance';
  }
}
