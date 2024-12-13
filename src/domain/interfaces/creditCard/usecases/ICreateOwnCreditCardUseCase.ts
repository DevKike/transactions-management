import { ICreateCreditCard, ICreditCard } from '../ICreditCard';

export interface ICreateOwnCreditCardUseCase {
  execute(creditCard: ICreateCreditCard): Promise<ICreditCard>;
}
