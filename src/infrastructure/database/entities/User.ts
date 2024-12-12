import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../../../domain/interfaces/user/IUser';
import { CreditCard } from './CreditCard';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => CreditCard, (creditCard) => creditCard.user)
  creditCards: CreditCard[];
}
