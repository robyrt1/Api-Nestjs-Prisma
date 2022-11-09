import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'cpfCnpjValidator', async: false })
export class CpfCnpjValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    if (text?.length <= 14) {
      return cpf.isValid(text);
    }
    return cnpj.isValid(text);
  }

  defaultMessage() {
    return 'CPF ou CNPJ inválido';
  }
}
