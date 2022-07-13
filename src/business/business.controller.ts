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
import { BusinessService } from './business.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Business } from './business.entity';
import { FvSettings } from '../invoices/fv_settings.entity';

@Controller('business')
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:businessId')
  getOneBusiness(
    @Request() payload,
    @Param('businessId') businessId: string,
  ): Promise<Business> {
    console.log(payload.user.userId);
    return this.businessService.getOneBusiness(businessId, payload.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:businessId/settings')
  getBusinessSettings(
    @Param('businessId') businessId: string,
    @Request() payload,
  ): Promise<FvSettings> {
    return this.businessService.getBusinessSettings(
      businessId,
      payload.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:businessId/settings')
  setBusinessSettings(
    @Param('businessId') businessId: string,
    @Request() payload,
    @Body() obj: { format: string },
  ): Promise<{ success: boolean }> {
    return this.businessService.setBusinessSettings(
      businessId,
      payload.user.userId,
      obj.format,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAllBusiness(@Request() payload): Promise<Business[]> {
    console.log(payload.user.userId);
    return this.businessService.getAllBusiness(payload.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  InsertBusiness(@Request() payload, @Body() obj): Promise<Business> {
    return this.businessService.createBusiness(obj, payload.user.userId);
  }
}
