import { IsNotEmpty, MaxLength, IsEmail, Validate } from 'class-validator';
import { CpfCnpjValidator } from '../../../validators/cpfCnpj.validator';
export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Preencha o Nome' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'Preencha o Cpf/Cnpj' })
  @Validate(CpfCnpjValidator)
  cpfCnpj: string;

  @IsEmail(undefined, { message: 'informe um email válido' })
  @IsNotEmpty({ message: 'Preencha o Nome' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres' })
  email: string;

  @IsNotEmpty({ message: 'Preencha o Telefone' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres' })
  cellphone: string;
}
