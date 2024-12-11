import { inject, injectable } from 'inversify';
import {
  ICreateCreditCard,
  ICreditCard,
} from '../../../domain/interfaces/creditCard/ICreditCard';
import { ICreditCardService } from '../../../domain/interfaces/creditCard/ICreditCardService';
import { ICreditCardRepository } from '../../../domain/interfaces/creditCard/ICreditCardRepository';
import { TYPES } from '../../inversify/types/types';

@injectable()
export class CreditCardService implements ICreditCardService {
  constructor(
    @inject(TYPES.CreditCardRepository)
    private readonly _creditCardRepository: ICreditCardRepository
  ) {}

  async create(creditCard: ICreateCreditCard): Promise<ICreditCard> {
    try {
      return await this._creditCardRepository.save(creditCard);
    } catch (error) {
      throw error;
    }
  }
}
