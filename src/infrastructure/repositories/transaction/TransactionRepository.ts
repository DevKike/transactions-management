import { DataSource, Repository } from 'typeorm';
import { ITransactionRepository } from '../../../domain/interfaces/transaction/ITransactionRepository';
import {
  ICreateTransaction,
  ITransaction,
} from '../../../domain/interfaces/transaction/ITransaction';
import { Transaction } from '../../database/entities/Transaction';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../inversify/types/types';

@injectable()
export class TransactionRepository implements ITransactionRepository {
  private readonly _transactionRepository: Repository<Transaction>;

  constructor(
    @inject(TYPES.DataSource) private readonly _dataSource: DataSource
  ) {
    this._transactionRepository = this._dataSource.getRepository(Transaction);
  }

  async save(transaction: ICreateTransaction): Promise<ITransaction> {
    return await this._transactionRepository.save(transaction);
  }
}
