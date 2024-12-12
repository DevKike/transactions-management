import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ICreditCard } from '../../../domain/interfaces/creditCard/ICreditCard';
import { User } from './User';

@Entity('credit_cards')
export class CreditCard implements ICreditCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'card_number', type: 'varchar', length: 16, unique: true })
  cardNumber: string;

  @Column({ name: 'credit_limit', type: 'decimal', precision: 10, scale: 2 })
  creditLimit: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @ManyToOne(() => User, (user) => user.creditCards)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
