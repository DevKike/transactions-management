import {
  ICreateCreditCard,
  ICreditCard,
} from '../../../domain/interfaces/creditCard/ICreditCard';
import { ICreditCardService } from '../../../domain/interfaces/creditCard/ICreditCardService';
import { ICreateOwnCreditCard } from '../../../domain/interfaces/creditCard/usecases/ICreateOwnCreditCard';

export class CreateOwnCreditCard implements ICreateOwnCreditCard {
  constructor(private readonly _creditCardService: ICreditCardService) {}

  async execute(creditCard: ICreateCreditCard): Promise<ICreditCard> {
    return await this._creditCardService.create(creditCard);
  }
}
