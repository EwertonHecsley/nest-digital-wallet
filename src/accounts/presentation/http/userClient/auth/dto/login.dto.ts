import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo email é obrigatório.' })
  @IsEmail({}, { message: 'Formato de email inválido.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo senha é obrigatório.' })
  @MinLength(4, { message: 'Senha deve ter no mínimo 4 caracteres.' })
  password: string;
}
