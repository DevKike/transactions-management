import { ICreateTransaction, ITransaction } from './ITransaction';

export interface ITransactionService {
  create(transaction: ICreateTransaction): Promise<ITransaction>;
}
