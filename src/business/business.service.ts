import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import {
  AddUserResponse,
  GetUserResponse,
  UserInterface,
} from 'src/types/Users';
import { Business } from './business.entity';
import { FvSettings } from '../invoices/fv_settings.entity';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(FvSettings)
    private fvSettingsRepository: Repository<FvSettings>,
  ) {}

  async createBusiness(obj, userId: UserInterface['id']): Promise<Business> {
    const business = Business.create({
      name: obj.name,
      nip: obj.nip,
      address: obj.address,
      postcode: obj.postcode,
      city: obj.city,
      type: obj.type,
      vat: obj.vat,
      subdomain: obj.subdomain,
      user: { id: userId },
    });

    await business.save();

    await this.fvSettingsRepository.create({ business }).save();

    return business;
  }

  async getAllBusiness(userId: UserInterface['id']): Promise<Business[]> {
    return await Business.find({
      where: {
        user: {
          id: userId,
        },
      } as FindOptionsWhere<Business>,
    });
  }

  async getOneBusiness(
    businessId: string,
    userId: UserInterface['id'],
  ): Promise<Business> {
    return await Business.findOne({
      where: {
        id: businessId,
        user: {
          id: userId,
        },
      } as FindOptionsWhere<Business>,
    });
  }

  async getBusinessSettings(
    businessId: string,
    userId: UserInterface['id'],
  ): Promise<FvSettings> {
    const business = await this.getOneBusiness(businessId, userId);

    return await this.fvSettingsRepository.findOne({
      where: {
        business_id: business.id,
      },
    });
  }

  async setBusinessSettings(
    businessId: string,
    userId: UserInterface['id'],
    format: string,
  ): Promise<{ success: boolean }> {
    const business = await this.getOneBusiness(businessId, userId);

    const settings = await this.fvSettingsRepository.findOne({
      where: {
        business_id: business.id,
      },
    });

    settings.format = format;

    await settings.save();

    return {
      success: true,
    };
  }

  async getAllUsers(): Promise<GetUserResponse[]> {
    const all_users = await this.usersRepository.find();
    return all_users.map((user) => {
      const { password, ...data } = user;
      return data;
    });
  }
}
