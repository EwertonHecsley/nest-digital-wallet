import { IsNotEmpty, IsNumber } from 'class-validator';

export class WithdrawUserClientDto {
  @IsNotEmpty({ message: 'Amount is obrigatory.' })
  @IsNumber({}, { message: 'Amount must be a number.' })
  amount: number;
}
