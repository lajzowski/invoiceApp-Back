import { Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { AddUserDto } from './dto/add-user.dto';
import { AddUserResponse, CheckExistRespone } from '../types/Users';
import * as bcrypt from 'bcrypt';
import { NotExistDto } from './dto/not-exist.dto';

export interface User {
  id: string;
  username: string;
  password?: string;
}

@Injectable()
export class UsersService {
  async findOneByUsername(username: string): Promise<any> {
    return await Users.findOne({
      where: { username },
    });
    //return this.users.find((u) => u.username === username);
  }

  async create(obj: AddUserDto): Promise<AddUserResponse> {
    const user = Users.create({
      ...obj,
      password: await bcrypt.hash(obj.password, 10),
    });
    const { password, ...result } = await user.save();
    return result;
  }

  async notExists(obj: NotExistDto): Promise<CheckExistRespone> {
    const cnt = await Users.count({
      where: {
        username: obj.username,
      },
    });

    return {
      exist: cnt !== 0,
    };
  }

  async findOneById(id: Users['id']): Promise<AddUserResponse> {
    const result = await Users.findOneBy({ id });
    return result;
  }
}
