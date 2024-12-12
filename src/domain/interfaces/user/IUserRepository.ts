import { ICreateUser, IUser } from './IUser';

export interface IUserRepository {
  save(user: ICreateUser): Promise<IUser>;
  findByEmail(
    email: ICreateUser['email'],
    includePassword?: boolean
  ): Promise<IUser | null>;
  findById(id: IUser['id']): Promise<IUser | null>;
}
