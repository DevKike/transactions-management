import { IUser } from '../user/IUser';
import { ICreateCreditCard, ICreditCard } from './ICreditCard';

export interface ICreditCardRepository {
  save(creditCard: ICreateCreditCard): Promise<ICreditCard>;
  findAll(): Promise<ICreditCard[]>;
  findAllByUserId(userId: IUser['id']): Promise<ICreditCard[]>;
  findById(creditCardId: ICreditCard['id']): Promise<ICreditCard | null>;
}
