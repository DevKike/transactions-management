import { ICreateCreditCard, ICreditCard } from './ICreditCard';

export interface ICreditCardRepository {
  save(creditCard: ICreateCreditCard): Promise<ICreditCard>;
  get(creditCardId: ICreditCard['id']): Promise<ICreditCard | null>;
}
