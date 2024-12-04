import { ICreateUser, IUser } from '../IUser';

export interface IRegisterUseCase {
  execute(userData: ICreateUser): Promise<IUser>;
}
