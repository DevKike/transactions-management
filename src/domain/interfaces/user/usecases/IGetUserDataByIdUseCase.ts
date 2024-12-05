import { IUser } from '../IUser';

export interface IGetUserDataByIdUseCase {
  execute(id: IUser['id']): Promise<IUser | null>;
}
