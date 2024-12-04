import { IAuthCredentials } from '../../../domain/interfaces/user/IUser';
import { IUserService } from '../../../domain/interfaces/user/IUserService';
import { ILoginUseCase } from '../../../domain/interfaces/user/usecases/ILoginUseCase';

export class LoginUseCase implements ILoginUseCase {
  constructor(private readonly _userService: IUserService) {}

  async execute(credentials: IAuthCredentials): Promise<string> {
    return await this._userService.authenticate(credentials);
  }
}
