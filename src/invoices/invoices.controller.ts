import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InvoicesService } from './invoices.service';
import { FvBase } from './fv_base.entity';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:businessId/:invoiceId')
  getOneInvoice(
    @Request() payload,
    @Param('businessId') businessId: string,
    @Param('invoiceId') invoiceId: string,
  ): Promise<FvBase> {
    return this.invoicesService.getOne(
      invoiceId,
      businessId,
      payload.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:businessId/:invoiceId')
  changeStatus(
    @Request() payload,
    @Param('businessId') businessId: string,
    @Param('invoiceId') invoiceId: string,
    @Body() obj: { status: number },
  ): Promise<{ success: boolean }> {
    console.log({ obj: obj });
    return this.invoicesService.changeStatus(
      invoiceId,
      businessId,
      payload.user.userId,
      obj.status,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:businessId/')
  getAllInvoice(
    @Request() payload,
    @Param('businessId') businessId: string,
  ): Promise<FvBase[]> {
    return this.invoicesService.getAll(businessId, payload.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:businessId/')
  createInvoice(
    @Request() payload,
    @Body() obj,
    @Param('businessId') businessId: string,
  ): Promise<FvBase> {
    return this.invoicesService.createInvoice(
      obj,
      payload.user.userId,
      businessId,
    );
  }
}
