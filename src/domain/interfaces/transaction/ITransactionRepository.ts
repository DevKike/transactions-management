import { ICreateTransaction, ITransaction } from './ITransaction';

export interface ITransactionRepository {
  save(transaction: ICreateTransaction): Promise<ITransaction>;
}
