import { ICreateUser, IUser } from '../../../domain/interfaces/user/IUser';
import { IUserService } from '../../../domain/interfaces/user/IUserService';
import { IRegisterUseCase } from '../../../domain/interfaces/user/usecases/IRegisterUseCase';

export class RegisterUseCase implements IRegisterUseCase {
  constructor(private readonly _userService: IUserService) {}

  async execute(userData: ICreateUser): Promise<IUser> {
    return await this._userService.create(userData);
  }
}
