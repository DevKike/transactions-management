import { IsEmail, IsString, Length, MinLength } from 'class-validator';
import { ICreateUser } from '../../../domain/interfaces/user/IUser';

export class UserRegisterDTO implements ICreateUser {
  @IsString()
  @Length(10, 50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
