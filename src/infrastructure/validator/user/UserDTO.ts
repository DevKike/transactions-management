import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class UserDTO {
  @IsString()
  @Length(10, 30)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
