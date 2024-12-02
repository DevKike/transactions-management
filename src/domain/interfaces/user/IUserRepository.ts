import { ICreateUser } from './IUser';

export interface IUserRepository {
  create(userData: ICreateUser): Promise<ICreateUser>;
}
