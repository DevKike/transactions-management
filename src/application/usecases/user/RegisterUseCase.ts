import { ICreateUser } from '../../../domain/interfaces/user/IUser';
import { IUserService } from '../../../domain/interfaces/user/IUserService';

export class RegisterUseCase {
  constructor(private readonly _userService: IUserService) {}

  async execute(userData: ICreateUser): Promise<ICreateUser> {
    return await this._userService.create(userData);
  }
}
