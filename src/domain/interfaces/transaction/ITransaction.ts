import { TransactionType } from '../../enums/transaction/TransactionType';
import { ICreditCard } from '../creditCard/ICreditCard';

export interface ITransaction {
  id: number;
  amount: number;
  transactionType: TransactionType;
  transactionDate: Date;
  creditCard: ICreditCard;
}
