import { IAuthCredentials } from '../IUser';

export interface ILoginUseCase {
  execute(credentials: IAuthCredentials): Promise<string>;
}
