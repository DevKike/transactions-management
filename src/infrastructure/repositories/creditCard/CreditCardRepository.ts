import { DataSource, Repository } from 'typeorm';
import {
  ICreateCreditCard,
  ICreditCard,
} from '../../../domain/interfaces/creditCard/ICreditCard';
import { ICreditCardRepository } from '../../../domain/interfaces/creditCard/ICreditCardRepository';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../inversify/types/types';
import { CreditCard } from '../../database/entities/CreditCard';

@injectable()
export class CreditCardRepository implements ICreditCardRepository {
  private _creditCardRepository: Repository<CreditCard>;

  constructor(
    @inject(TYPES.DataSource) private readonly _appDataSource: DataSource
  ) {
    this._creditCardRepository = _appDataSource.getRepository(CreditCard);
  }

  async save(creditCard: ICreateCreditCard): Promise<ICreditCard> {
    return await this._creditCardRepository.save(creditCard);
  }
}
