import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';
import { BusinessInterface } from '../types/Business';

@Entity('business')
export class Business extends BaseEntity implements BusinessInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'bigint' })
  nip: number;

  @Column()
  address: string;

  @Column({ length: 10 })
  postcode: string;

  @Column({ length: 100 })
  city: string;

  @Column({ type: 'tinyint' })
  type: number;

  @Column({ type: 'tinyint' })
  vat: number;

  @Column({ length: 63, unique: true })
  subdomain: string;

  @ManyToOne(() => Users, (entity) => entity.id)
  user: Users; // Primary user!
  //@Column({ length: 36 })
  //admin_id: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  date_created: Date;
}
