import { IAuthCredentials, ICreateUser, IUser } from './IUser';

export interface IUserService {
  create(userData: ICreateUser): Promise<IUser>;
  authenticate(credentials: IAuthCredentials): Promise<string>;
  getDataById(id: IUser['id']): Promise<IUser | null>;
}
