import { IsNotEmpty, IsString } from 'class-validator';

export class TransferUserClientDto {
  @IsString()
  @IsNotEmpty({ message: 'toUserId should not be empty' })
  toUserId: string;

  @IsNotEmpty({ message: 'amount should not be empty' })
  amount: number;
}
