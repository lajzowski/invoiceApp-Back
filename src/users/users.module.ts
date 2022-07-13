import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    /* Używamy jeżeli nie kożystamy z ActiveRecord - TypeOrmModule.forFeature([UsersEntity]) */
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
