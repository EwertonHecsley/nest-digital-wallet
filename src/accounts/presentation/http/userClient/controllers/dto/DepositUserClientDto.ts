import { IsNotEmpty, IsNumber } from 'class-validator';

export class DepositUserClientDto {
  @IsNotEmpty({ message: 'Amount is obrigatory.' })
  @IsNumber({}, { message: 'Amount must be a number.' })
  amount: number;
}
