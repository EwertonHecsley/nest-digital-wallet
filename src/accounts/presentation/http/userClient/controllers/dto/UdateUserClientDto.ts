import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserClientDTO {
  @IsString()
  @IsNotEmpty({ message: 'Full name is obrigatory.' })
  @IsOptional()
  fullName: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is obrigatory.' })
  @IsEmail({}, { message: 'Invalid email format.' })
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password is obrigatory.' })
  @IsOptional()
  password: string;
}
