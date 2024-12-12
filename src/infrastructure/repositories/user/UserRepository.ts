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

  async save(userData: ICreateUser): Promise<IUser> {
    return await this._userRepository.save(userData);
  }

  async findByEmail(
    email: ICreateUser['email'],
    includePassword?: boolean
  ): Promise<IUser | null> {
    return await this._userRepository.findOne({
      where: { email: email },
      select: { id: true, name: true, email: true, password: includePassword },
    });
  }

  async findById(id: IUser['id']): Promise<IUser | null> {
    return await this._userRepository.findOneBy({ id: id });
  }
}
