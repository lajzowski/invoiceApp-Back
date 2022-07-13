import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FvBase } from './fv_base.entity';

@Entity('fv_base_entries')
export class FvBaseEntries extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column({ length: 36 })
  @ManyToOne(() => FvBase, (entity) => entity.id)
  fv_base: FvBase;

  @Column({ length: 150 })
  product_name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @Column({ type: 'tinyint' })
  unit: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price_netto: number;

  @Column({ type: 'tinyint' })
  vat_percentage: number;

  @Column({ length: 36, default: null, nullable: true })
  product_id: string;
}
