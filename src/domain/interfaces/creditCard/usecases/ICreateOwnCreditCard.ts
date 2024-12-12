import { ICreateCreditCard, ICreditCard } from "../ICreditCard";

export interface ICreateOwnCreditCard {
  execute(creditCard: ICreateCreditCard): Promise<ICreditCard>;
}
