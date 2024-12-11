import { ICreateCreditCard, ICreditCard } from './ICreditCard';

export interface ICreditCardService {
  create(creditCard: ICreateCreditCard): Promise<ICreditCard>;
}
