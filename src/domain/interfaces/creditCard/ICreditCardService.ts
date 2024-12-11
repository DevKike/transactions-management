import { ICreateCreditCard, ICreditCard } from './ICreditCard';

export interface ICreditCardService {
  create(creditCard: ICreateCreditCard): Promise<ICreditCard>;
  checkBalance(creditCardId: ICreditCard['id']): Promise<ICreateCreditCard['balance']>;
}
