import { inject, injectable } from 'inversify';
import {
  IAuthCredentials,
  ICreateUser,
  IUser,
} from '../../../domain/interfaces/user/IUser';
import { IUserService } from '../../../domain/interfaces/user/IUserService';
import { TYPES } from '../../inversify/types/types';
import { IUserRepository } from '../../../domain/interfaces/user/IUserRepository';
import { compare, hash } from '../../utils/bcrypt';
import { AlreadyExistException } from '../../../domain/exceptions/AlreadyExistsException';
import { IJwtService } from '../../jwt/interfaces/IJwtService';
import { IJwtPayload } from '../../jwt/interfaces/IJwtPayload';
import { NotFoundException } from '../../../domain/exceptions/NotFoundException';
import { InvalidCredentialsException } from '../../../domain/exceptions/InvalidCredentialsException';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository,
    @inject(TYPES.AuthService)
    private readonly _authService: IJwtService
  ) {}

  async create(userData: ICreateUser): Promise<IUser> {
    try {
      const userWithHashedPassword: ICreateUser = {
        ...userData,
        password: await hash(userData.password),
      };

      const savedUser = await this._userRepository.save(userWithHashedPassword);

      const savedUserCopy = { ...(savedUser as any) };
      delete savedUserCopy.password;

      return savedUserCopy;
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new AlreadyExistException('User already exists');
      }
      throw error;
    }
  }

  async authenticate(credentials: IAuthCredentials): Promise<string> {
    try {
      const user = await this._userRepository.findByEmail(
        credentials.email,
        true
      );

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isValidPassword = await this.validatePassword(
        credentials.password,
        user.password
      );

      if (!isValidPassword) {
        throw new InvalidCredentialsException('Email or password is incorrect');
      }

      return this.generateToken(user);
    } catch (error) {
      throw error;
    }
  }

  async getDataById(id: IUser['id']): Promise<IUser | null> {
    try {
      return await this._userRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }

  private async validatePassword(
    plainPassword: string,
    encryptedPassword: string
  ): Promise<boolean> {
    return await compare(plainPassword, encryptedPassword);
  }

  private generateToken(payload: IJwtPayload): string {
    return this._authService.generateToken({
      id: payload.id,
      email: payload.email,
    });
  }
}
