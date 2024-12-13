import {
  ICreateCreditCard,
  ICreditCard,
} from '../../../domain/interfaces/creditCard/ICreditCard';
import { ICreditCardService } from '../../../domain/interfaces/creditCard/ICreditCardService';
import { ICreateOwnCreditCardUseCase } from '../../../domain/interfaces/creditCard/usecases/ICreateOwnCreditCardUseCase';

export class CreateOwnCreditCard implements ICreateOwnCreditCardUseCase {
  constructor(private readonly _creditCardService: ICreditCardService) {}

  async execute(creditCard: ICreateCreditCard): Promise<ICreditCard> {
    return await this._creditCardService.create(creditCard);
  }
}
