import { inject, injectable } from 'inversify';
import {
  ICreateCreditCard,
  ICreditCard,
} from '../../../domain/interfaces/creditCard/ICreditCard';
import { ICreditCardService } from '../../../domain/interfaces/creditCard/ICreditCardService';
import { ICreditCardRepository } from '../../../domain/interfaces/creditCard/ICreditCardRepository';
import { TYPES } from '../../inversify/types/types';
import { NotFoundException } from '../../../domain/exceptions/NotFoundException';
import { AlreadyExistException } from '../../../domain/exceptions/AlreadyExistsException';
import { IUser } from '../../../domain/interfaces/user/IUser';
import { UnauthorizedException } from '../../../domain/exceptions/UnauthorizedException';

@injectable()
export class CreditCardService implements ICreditCardService {
  constructor(
    @inject(TYPES.CreditCardRepository)
    private readonly _creditCardRepository: ICreditCardRepository
  ) {}

  async create(creditCard: ICreateCreditCard): Promise<ICreditCard> {
    try {
      return await this._creditCardRepository.save(creditCard);
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new AlreadyExistException('Credit card already exists');
      }
      throw error;
    }
  }

  async getAll(): Promise<ICreditCard[]> {
    try {
      const creditCards = await this._creditCardRepository.findAll();

      if (!creditCards || creditCards.length === 0) {
        throw new NotFoundException('No credit cards were found');
      }

      return creditCards;
    } catch (error) {
      throw error;
    }
  }

  async getAllByUserId(userId: IUser['id']): Promise<ICreditCard[]> {
    try {
      const creditCards = await this._creditCardRepository.findAllByUserId(
        userId
      );

      if (!creditCards || creditCards.length === 0) {
        throw new NotFoundException('No credit cards were found');
      }

      return creditCards;
    } catch (error) {
      throw error;
    }
  }

  async checkBalance(
    creditCardId: ICreditCard['id'],
    userId: IUser['id']
  ): Promise<ICreditCard['balance']> {
    try {
      const creditCard = await this._creditCardRepository.findById(
        creditCardId
      );

      if (!creditCard) {
        throw new NotFoundException('Credit card not found');
      }

      if (creditCard.user.id !== userId) {
        throw new UnauthorizedException('Unauthorized access');
      }

      return creditCard.balance;
    } catch (error) {
      throw error;
    }
  }
}
