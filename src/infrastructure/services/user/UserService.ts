import { inject, injectable } from 'inversify';
import { ICreateUser, IUser } from '../../../domain/interfaces/user/IUser';
import { IUserService } from '../../../domain/interfaces/user/IUserService';
import { TYPES } from '../../inversify/types/types';
import { IUserRepository } from '../../../domain/interfaces/user/IUserRepository';
import { hash } from '../../utils/bcrypt';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository
  ) {}
  async create(userData: ICreateUser): Promise<IUser> {
    try {
      const newUserData: ICreateUser = {
        ...userData,
        password: await hash(userData.password),
      };
      return await this._userRepository.create(newUserData);
    } catch (error) {
      throw error;
    }
  }
}
