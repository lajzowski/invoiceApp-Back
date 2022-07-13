import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AddUserDto } from './dto/add-user.dto';
import { UsersService } from './users.service';
import { AddUserResponse } from '../types/Users';
import { NotExistDto } from './dto/not-exist.dto';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @Post('/')
  async create(@Body() user: AddUserDto): Promise<AddUserResponse> {
    return await this.usersService.create(user);
  }

  @Post('/check-username/')
  async notExists(@Body() obj: NotExistDto) {
    return await this.usersService.notExists(obj);
  }

  /*  @Get('/:id')
  async findById(@Param('id') id: string): Promise<AddUserResponse> {
    return await this.usersService.findOneById(id);
  }*/
}
