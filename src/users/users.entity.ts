import { Business } from 'src/business/business.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInterface } from '../types/Users';

@Entity('users')
export class Users extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ length: 63, unique: true })
  email: string;

  @Column({ length: 63 })
  name: string;

  @Column({ length: 63 })
  surname: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  date_created: Date;
  /*

  @Column({
    type: 'float',
    precision: 6, // laczna max ilosc liczb lacznie z tymi po przecinku
    scale: 2, // ile liczb po przecinku
    default: null, // domyślna wartość
    nullable: true, // pozwalaj na nulla

  })
  cena: number | null;


// Uruchamianie funkcji mysqlowej

@Column({default: () => 'CURRENT_TIMESTAMP'})
   */
}
