import { IUser } from '../../../domain/interfaces/user/IUser';
import { IUserService } from '../../../domain/interfaces/user/IUserService';
import { IGetUserDataByIdUseCase } from '../../../domain/interfaces/user/usecases/IGetUserDataByIdUseCase';

export class GetUserDataById implements IGetUserDataByIdUseCase {
  constructor(private readonly _userService: IUserService) {}

  async execute(id: IUser['id']): Promise<IUser | null> {
    return await this._userService.getDataById(id);
  }
}
