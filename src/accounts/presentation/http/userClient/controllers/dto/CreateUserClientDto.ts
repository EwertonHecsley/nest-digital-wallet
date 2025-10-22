import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserClientDTO {
  @IsString()
  @IsNotEmpty({ message: 'Full name is obrigatory.' })
  fullName: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is obrigatory.' })
  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'CPF is obrigatory.' })
  cpf: string;

  @IsString()
  @IsNotEmpty({ message: 'password is obrigatory.' })
  password: string;
}
