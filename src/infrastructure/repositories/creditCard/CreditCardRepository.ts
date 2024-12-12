import { DataSource, Repository } from 'typeorm';
import {
  ICreateCreditCard,
  ICreditCard,
} from '../../../domain/interfaces/creditCard/ICreditCard';
import { ICreditCardRepository } from '../../../domain/interfaces/creditCard/ICreditCardRepository';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../inversify/types/types';
import { CreditCard } from '../../database/entities/CreditCard';
import { IUser } from '../../../domain/interfaces/user/IUser';

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

  async findAll(): Promise<ICreditCard[]> {
    return await this._creditCardRepository.find({ relations: ['user'] });
  }

  async findAllByUserId(userId: IUser['id']): Promise<ICreditCard[]> {
    return await this._creditCardRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  } 

  async findById(creditCardId: ICreditCard['id']): Promise<ICreditCard | null> {
    return await this._creditCardRepository.findOne({
      where: { id: creditCardId },
      relations: ['user'],
    });
  }
}
