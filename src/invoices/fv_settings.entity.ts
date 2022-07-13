import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Business } from '../business/business.entity';

@Entity('fv_settings')
export class FvSettings extends BaseEntity {
  @PrimaryColumn({ length: 36 })
  business_id: string;
  @OneToOne(() => Business, { cascade: true })
  @JoinColumn({ name: 'business_id' })
  business: Business;

  @BeforeInsert()
  newId() {
    this.business_id = this.business.id;
  }

  @Column({ length: 50, default: 'FV/[YYYY]/[YC]' })
  format: string;
}
