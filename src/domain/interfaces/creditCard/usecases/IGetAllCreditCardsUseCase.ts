import { ICreditCard } from '../ICreditCard';

export interface IGetAllCreditCardsUseCase {
  execute(): Promise<ICreditCard[]>;
}
