import { IUser } from '../user/IUser';
import { ICreateCreditCard, ICreditCard } from './ICreditCard';

export interface ICreditCardService {
  create(creditCard: ICreateCreditCard): Promise<ICreditCard>;
  getAll(): Promise<ICreditCard[]>; 
  getAllByUserId(userId: IUser['id']): Promise<ICreditCard[]>;
  checkBalance(creditCardId: ICreditCard['id']): Promise<ICreateCreditCard['balance']>;
}
