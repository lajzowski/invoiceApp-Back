import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from '../business/business.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Business])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
