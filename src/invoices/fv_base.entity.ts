import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Business } from '../business/business.entity';
import { Users } from '../users/users.entity';
import { FvBaseEntries } from './fv_base_entries.entity';

@Entity('fv_base')
export class FvBase extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //@Column({ length: 36 })
  @ManyToOne(() => Business, (entity) => entity.id)
  business: Business;

  //@Column({ length: 36 })

  @ManyToOne(() => Users, (entity) => entity.id)
  user: Users;

  @Column({ length: 50 })
  number: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  date_created: Date;

  @Column()
  date_sold: Date;

  @Column()
  date_payment: Date;

  @Column({ type: 'tinyint' })
  payment_type: number;

  @Column({ length: 36, nullable: true, default: null })
  buyer_id: string;

  @Column({ type: 'tinyint' })
  buyer_type: number;

  @Column()
  buyer_name: string;

  @Column({ type: 'bigint' })
  buyer_nip: number;

  @Column()
  buyer_address: string;

  @Column({ length: 10 })
  buyer_postcode: string;

  @Column({ length: 100 })
  buyer_city: string;

  @Column()
  seller_name: string;

  @Column({ type: 'bigint' })
  seller_nip: number;

  @Column()
  seller_address: string;

  @Column({ length: 10 })
  seller_postcode: string;

  @Column({ length: 100 })
  seller_city: string;

  @Column({ length: 100 })
  seller_signature: string;

  @Column({ type: 'text', default: null, nullable: true })
  comments: string;

  @Column({ type: 'tinyint', default: 0 })
  status: number;

  @OneToMany((type) => FvBaseEntries, (entity) => entity.fv_base)
  @JoinTable()
  entries: FvBaseEntries[];
}
