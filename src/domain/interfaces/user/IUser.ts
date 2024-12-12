import { ICreditCard } from "../creditCard/ICreditCard";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  creditCards: ICreditCard[];
}

export interface ICreateUser extends Omit<IUser, 'id' | 'creditCards'> {}

export interface IAuthCredentials extends Pick<IUser, 'email' | 'password'> {}
