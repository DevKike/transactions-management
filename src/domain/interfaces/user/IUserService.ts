import { IAuthCredentials, ICreateUser, IUser } from './IUser';

export interface IUserService {
  create(userData: ICreateUser): Promise<IUser>;
  authenticate(credentials: IAuthCredentials): Promise<string>;
}
