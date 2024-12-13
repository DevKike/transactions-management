import {
  ICreateTransaction,
  ITransaction,
} from '../../../domain/interfaces/transaction/ITransaction';
import { ITransactionRepository } from '../../../domain/interfaces/transaction/ITransactionRepository';
import { ITransactionService } from '../../../domain/interfaces/transaction/ITransactionService';

export class TransactionService implements ITransactionService {
  constructor(
    private readonly _transactionRepository: ITransactionRepository
  ) {}

  async create(transaction: ICreateTransaction): Promise<ITransaction> {
    try {
      return await this._transactionRepository.save(transaction);
    } catch (error) {
      throw error;
    }
  }
}
