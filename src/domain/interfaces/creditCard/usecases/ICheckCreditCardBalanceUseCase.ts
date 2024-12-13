import { IUser } from '../../user/IUser';
import { ICreditCard } from '../ICreditCard';

export interface ICheckCreditCardBalanceUseCase {
  execute(
    creditCardId: ICreditCard['id'],
    userId: IUser['id']
  ): Promise<number>;
}
