import { HttpException } from "@nestjs/common";

export class InvalidCpfException extends HttpException {
  constructor(message: string = 'Invalid CPF.') {
    super(message, 400);
    this.name = 'InvalidCpf';
  }
}
