import { IsDecimal, IsNumber, IsPositive, IsString, Length } from 'class-validator';
import { ICreateCreditCard } from '../../../domain/interfaces/creditCard/ICreditCard';

export class CreditCardRegisterDTO implements ICreateCreditCard {
  @IsString()
  @Length(16, 16, { message: 'The card number must have 16 digits' })
  cardNumber: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  creditLimit: number;
}
