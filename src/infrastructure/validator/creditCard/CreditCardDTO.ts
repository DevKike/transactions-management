import { IsDecimal, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreditCardDTO {
  @IsDecimal({ decimal_digits: '2' })
  @IsPositive()
  creditLimit: number;

  @IsNotEmpty()
  @IsNumber()
  balance: number;
}
