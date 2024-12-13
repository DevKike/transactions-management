import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ITransaction } from '../../../domain/interfaces/transaction/ITransaction';
import { TransactionType } from '../../../domain/enums/transaction/TransactionType';
import { CreditCard } from './CreditCard';

@Entity('transactions')
export class Transaction implements ITransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({ name: 'transaction_type', type: 'enum', enum: TransactionType, nullable: false })
  transactionType: TransactionType;

  @CreateDateColumn({ name: 'transaction_date' })
  transactionDate: Date;

  @ManyToOne(() => CreditCard, (creditCard) => creditCard.transactions)
  @JoinColumn({ name: 'credit_card_id' })
  creditCard: CreditCard;
}
