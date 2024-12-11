import { IUser } from '../../user/IUser';
import { ICreditCard } from '../ICreditCard';

export interface ICheckCreditCardBalance {
  execute(
    creditCardId: ICreditCard['id'],
    userId: IUser['id']
  ): Promise<number>;
}
