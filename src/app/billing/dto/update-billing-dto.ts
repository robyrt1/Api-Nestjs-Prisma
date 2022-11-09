import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  MaxLength,
  Min,
  IsDateString,
  IsUUID,
} from 'class-validator';

export class UpdateBillingDto {
  @IsNotEmpty({ message: 'Preencha a Descrição' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres' })
  description: string;

  @IsNotEmpty({ message: 'Preencha o valor' })
  @Type(() => Number)
  @Min(1, { message: 'Valor minimo é 1' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres' })
  value: number;

  @IsNotEmpty({ message: 'Preencha a data de vencimento' })
  @IsDateString(undefined, { message: 'Preenchar uma data válida' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres' })
  dueDate: string;

  @IsNotEmpty({ message: 'Selecione o Cliente' })
  @IsUUID('4', { message: 'o id do cliente é invalido' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 caracteres' })
  customerId: string;
}
