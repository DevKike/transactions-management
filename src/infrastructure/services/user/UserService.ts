import { inject, injectable } from 'inversify';
import { ICreateUser, IUser } from '../../../domain/interfaces/user/IUser';
import { IUserService } from '../../../domain/interfaces/user/IUserService';
import { TYPES } from '../../inversify/types/types';
import { IUserRepository } from '../../../domain/interfaces/user/IUserRepository';
import { hash } from '../../utils/bcrypt';
import { AlreadyExistException } from '../../../domain/exceptions/AlreadyExistsException';

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

      const user = await this._userRepository.create(newUserData);
      const userCopy = { ...user } as any;

      delete userCopy.password;

      return userCopy;
    } catch (error) {
        if (error instanceof Error && (error as any).code === 'ER_DUP_ENTRY') {
          throw new AlreadyExistException('User already exists');          
        }
      throw error;
    }
  }
}
