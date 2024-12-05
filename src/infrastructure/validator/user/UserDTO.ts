import { IsEmail, IsString, Length, MinLength } from 'class-validator';
import { ICreateUser } from '../../../domain/interfaces/user/IUser';

export class UserDTO implements ICreateUser {
  @IsString()
  @Length(10, 30)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
