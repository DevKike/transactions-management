import { IUser } from '../../user/IUser';
import { ICreditCard } from '../ICreditCard';

export interface IGetUserCreditCardsUseCase {
  execute(userId: IUser['id']): Promise<ICreditCard[]>;
}
