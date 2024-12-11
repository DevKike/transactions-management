import { ICreateCreditCard, ICreditCard } from './ICreditCard';

export interface ICreditCardRepository {
  save(creditCard: ICreateCreditCard): Promise<ICreditCard>;
  findAll(): Promise<ICreditCard[]>;
  findById(creditCardId: ICreditCard['id']): Promise<ICreditCard | null>;
}
