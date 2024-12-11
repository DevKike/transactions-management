import { ICreateCreditCard, ICreditCard } from './ICreditCard';

export interface ICreditCardRepository {
  save(creditCard: ICreateCreditCard): Promise<ICreditCard>;
}
