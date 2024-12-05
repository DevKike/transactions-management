import { inject, injectable } from 'inversify';
import { ICreateUser, IUser } from '../../../domain/interfaces/user/IUser';
import { IUserRepository } from '../../../domain/interfaces/user/IUserRepository';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../database/entities/User';
import { TYPES } from '../../inversify/types/types';

@injectable()
export class UserRepository implements IUserRepository {
  private _userRepository: Repository<User>;
  constructor(
    @inject(TYPES.DataSource) private readonly _appDataSource: DataSource
  ) {
    this._userRepository = _appDataSource.getRepository(User);
  }

  async create(userData: ICreateUser): Promise<IUser> {
    return await this._userRepository.save(userData);
  }

  async findByEmail(email: ICreateUser['email']): Promise<IUser | null> {
    return await this._userRepository.findOneBy({ email: email });
  }

  async findById(id: IUser['id']): Promise<IUser | null> {
    return await this._userRepository.findOneBy({ id: id });
  }
}
