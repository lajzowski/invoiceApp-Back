import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { FvSettings } from '../invoices/fv_settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, FvSettings])],
  controllers: [BusinessController],
  providers: [BusinessService],
  exports: [BusinessService],
})
export class BusinessModule {}
