import { IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Preencha o Nome' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres' })
  firsName: string;

  @IsNotEmpty({ message: 'Preencha o Sobrenome' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres' })
  lastName: string;

  @IsEmail(undefined, { message: 'informe um email válido' })
  @IsNotEmpty({ message: 'Preencha o Email' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres' })
  email: string;
}
