import { IsEmail, IsString, Length, MinLength } from 'class-validator';
import { IAuthCredentials } from '../../../domain/interfaces/user/IUser';

export class UserLoginDTO implements IAuthCredentials {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
