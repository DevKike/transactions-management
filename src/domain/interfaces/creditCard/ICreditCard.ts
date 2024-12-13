import { ITransaction } from '../transaction/ITransaction';
import { IUser } from '../user/IUser';

export interface ICreditCard {
  id: number;
  cardNumber: string;
  creditLimit: number;
  balance: number;
  user: IUser;
  transactions: ITransaction[];
}

export interface ICreateCreditCard
  extends Omit<ICreditCard, 'id' | 'balance' | 'user' | 'transactions'> {}
