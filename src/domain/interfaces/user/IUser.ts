export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface ICreateUser extends Omit<IUser, 'id'> {}

export interface IAuthUser extends Pick<IUser, 'email' | 'password'> {}
