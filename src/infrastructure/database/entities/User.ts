import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../../../domain/interfaces/user/IUser';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
