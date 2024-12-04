import { ICreateUser, IUser } from './IUser';

export interface IUserRepository {
  create(user: ICreateUser): Promise<IUser>;
  findByEmail(email: ICreateUser["email"]): Promise<IUser | null>;
}
