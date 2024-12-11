import { ICreditCard } from '../ICreditCard';

export interface ICheckCreditCardBalance {
  execute(creditCardId: ICreditCard['id']): Promise<number>;
}
