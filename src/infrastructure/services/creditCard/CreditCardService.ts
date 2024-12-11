import { inject, injectable } from 'inversify';
import {
  ICreateCreditCard,
  ICreditCard,
} from '../../../domain/interfaces/creditCard/ICreditCard';
import { ICreditCardService } from '../../../domain/interfaces/creditCard/ICreditCardService';
import { ICreditCardRepository } from '../../../domain/interfaces/creditCard/ICreditCardRepository';
import { TYPES } from '../../inversify/types/types';
import { NotFoundException } from '../../../domain/exceptions/NotFoundException';

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

  async checkBalance(
    creditCardId: ICreditCard['id']
  ): Promise<ICreditCard['balance']> {
    try {
      const creditCard = await this._creditCardRepository.get(creditCardId);

      if (!creditCard) {
        throw new NotFoundException('Credit card not found');
      }

      return creditCard.balance;
    } catch (error) {
      throw error;
    }
  }
}
