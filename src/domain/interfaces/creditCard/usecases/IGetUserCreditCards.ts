import { IUser } from '../../user/IUser';
import { ICreditCard } from '../ICreditCard';

export interface IGetUserCreditCards {
  execute(userId: IUser['id']): Promise<ICreditCard[]>;
}
