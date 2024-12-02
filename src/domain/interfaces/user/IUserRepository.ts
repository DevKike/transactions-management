import { ICreateUser } from './IUser';

export interface IUserRepository {
  create(user: ICreateUser): Promise<ICreateUser>;
}
