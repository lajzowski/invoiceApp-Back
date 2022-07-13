import { Injectable } from '@nestjs/common';
import { FvBase } from './fv_base.entity';
import { UserInterface } from '../types/Users';
import { BusinessInterface } from '../types/Business';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { Business } from '../business/business.entity';
import { FvBaseEntries } from './fv_base_entries.entity';
import { FvSettings } from './fv_settings.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
  ) {}

  async getOne(
    invoiceId: string,
    businessId: string,
    userId: string,
  ): Promise<FvBase> {
    return await FvBase.findOne({
      where: {
        id: invoiceId,
        business: { id: businessId },
        user: { id: userId },
      },
      relations: {
        entries: true,
      },
    });
  }

  async createInvoice(
    obj,
    userId: UserInterface['id'],
    businessId: BusinessInterface['id'],
  ): Promise<FvBase> {
    const business = await this.businessRepository.findOne({
      where: { id: businessId, user: { id: userId } },
    });

    if (!business) {
      throw new Error('Business not found!');
    }

    console.log(business);

    const { format: invoiceFormat } = await FvSettings.findOne({
      where: { business: { id: businessId } },
    });

    const currentYear = new Date().getFullYear();
    const currentMonth = ('0' + (new Date().getMonth() + 1)).slice(-2);
    const currentDay = ('0' + new Date().getDay()).slice(-2);

    const { yearCnt } = await FvBase.createQueryBuilder('fv_base')
      .select('COUNT(id)', 'yearCnt') // drugi parametr działa jak AS w SQL np, select(COUNT(id), 'cnt'); poźniej trzeba pobrać raw i mozna zrobić destr. cnt {cnt} =..
      // .from(FvBase, 'fv_base')
      .where('fv_base.date_created LIKE ":currentYear-%"', {
        currentYear,
      })
      .andWhere('fv_base.businessId = :businessId', { businessId })

      .getRawOne();

    const { monthCnt } = await FvBase.createQueryBuilder('fv_base')
      .select('COUNT(id)', 'monthCnt') // drugi parametr działa jak AS w SQL np, select(COUNT(id), 'cnt'); poźniej trzeba pobrać raw i mozna zrobić destr. cnt {cnt} =..
      // .from(FvBase, 'fv_base')
      .where('fv_base.date_created LIKE :inject', {
        inject: `${currentYear}-${currentMonth}-%`,
      })
      .andWhere('fv_base.businessId = :businessId', { businessId })

      .getRawOne();

    const { dayCnt } = await FvBase.createQueryBuilder('fv_base')
      .select('COUNT(id)', 'dayCnt') // drugi parametr działa jak AS w SQL np, select(COUNT(id), 'cnt'); poźniej trzeba pobrać raw i mozna zrobić destr. cnt {cnt} =..
      // .from(FvBase, 'fv_base')
      .where('fv_base.date_created LIKE :inject', {
        inject: `${currentYear}-${currentMonth}-${currentDay}`,
      })
      .andWhere('fv_base.businessId = :businessId', { businessId })

      .getRawOne();

    let fvNumber = invoiceFormat.replace('[YYYY]', currentYear.toString());
    fvNumber = fvNumber.replace('[MM]', currentMonth.toString());
    fvNumber = fvNumber.replace('[DD]', currentDay.toString());

    fvNumber = fvNumber.replace('[YC]', yearCnt + 1);
    fvNumber = fvNumber.replace('[MC]', monthCnt + 1);
    fvNumber = fvNumber.replace('[DC]', dayCnt + 1);

    console.log({ yearCnt, monthCnt, currentYear });

    const invoice = FvBase.create({
      business: { id: businessId },
      user: { id: userId },
      number: fvNumber,
      date_sold: obj.date_sold,
      date_payment: obj.date_payment,

      payment_type: obj.payment_type,

      buyer_type: obj.buyer_type,
      buyer_name: obj.buyer_name,
      buyer_nip: obj.buyer_nip,
      buyer_address: obj.buyer_address,
      buyer_city: obj.buyer_city,
      buyer_postcode: obj.buyer_postcode,

      seller_name: business.name,
      seller_nip: business.nip,
      seller_address: business.address,
      seller_postcode: business.postcode,
      seller_city: business.city,
      seller_signature: obj.seller_signature,
      comments: obj.comments,
      status: obj.status,
    });

    const newInvoice = await invoice.save();

    for (const oneEntry of obj.entries) {
      const entry = FvBaseEntries.create({
        ...oneEntry,
        fv_base: newInvoice,
      });
      await entry.save();
    }

    return await this.getOne(newInvoice.id, businessId, userId);
  }

  async getAll(businessId: string, userId: string): Promise<FvBase[]> {
    return await FvBase.find({
      where: {
        business: { id: businessId },
        user: { id: userId },
      },
      order: {
        number: 'DESC',
      },
    });
  }

  async changeStatus(
    invoiceId: string,
    businessId: string,
    userId: string,
    status: number,
  ): Promise<{ success: boolean }> {
    const invoice = await FvBase.findOne({
      where: {
        id: invoiceId,
        business: { id: businessId },
        user: { id: userId },
      },
    });

    invoice.status = status;

    await invoice.save();
    return {
      success: true,
    };
  }
}
