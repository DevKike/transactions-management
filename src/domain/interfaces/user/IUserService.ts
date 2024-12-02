import { ICreateUser } from './IUser';

export interface IUserService {
  create(userData: ICreateUser): Promise<ICreateUser>;
}
