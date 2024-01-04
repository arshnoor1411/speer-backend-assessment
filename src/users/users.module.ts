import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendgridService } from 'src/services/sendgrid.service';
import { JwtAuthService } from 'src/services/jwt.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, SendgridService, JwtAuthService, JwtService],
})
export class UsersModule {}
