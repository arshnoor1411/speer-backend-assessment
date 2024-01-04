import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const userExists = await this.usersService.findOne(createUserDto.email);

      if (userExists) {
        throw new HttpException(
          'User exists with the email',
          HttpStatus.BAD_REQUEST,
        );
      }

      return this.usersService.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const user = await this.usersService.findOne(email);
      console.log(user);

      if (!user) {
        throw new HttpException(
          'User exists with the email',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.usersService.login(email, password);
    } catch (error) {
      throw error;
    }
  }

  @Get('verify-otp')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string) {
    try {
      return this.usersService.verifyOtp(email, otp);
      // return this.usersService.login(email, password);
    } catch (error) {
      throw error;
    }
  }

  @Get('resend-otp')
  async resendOtp(@Body('email') email: string) {
    try {
      return this.usersService.resendOtp(email);
    } catch (error) {
      throw error;
    }
  }
}
