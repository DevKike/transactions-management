import { inject, injectable } from 'inversify';
import { ICreateUser } from '../../../domain/interfaces/user/IUser';
import { IUserService } from '../../../domain/interfaces/user/IUserService';
import { TYPES } from '../../inversify/types/types';
import { IUserRepository } from '../../../domain/interfaces/user/IUserRepository';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository
  ) {}
  create(userData: ICreateUser): Promise<ICreateUser> {
    try {
      return this._userRepository.create(userData);
    } catch (error) {
      throw error;
    }
  }
}
