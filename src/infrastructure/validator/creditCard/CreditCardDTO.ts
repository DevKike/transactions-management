import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreditCardDTO {
  @IsNumber()
  @MinLength(16)
  @MaxLength(16)
  cardNumber: number;

  @IsDecimal({ decimal_digits: '2' })
  @IsPositive()
  creditLimit: number;
}
