import { IsNotEmpty, MaxLength, IsEmail } from 'class-validator';
export class UpdateCustomerDto {
  @IsNotEmpty({ message: 'Preencha o Nome' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres' })
  name: string;

  @IsEmail(undefined, { message: 'informe um email válido' })
  @IsNotEmpty({ message: 'Preencha o Nome' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres' })
  email: string;

  @IsNotEmpty({ message: 'Preencha o Telefone' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres' })
  cellphone: string;
}
