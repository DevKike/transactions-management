import { ICreditCard } from '../ICreditCard';

export interface IGetAllCreditCards {
  execute(): Promise<ICreditCard[]>;
}
