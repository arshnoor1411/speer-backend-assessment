import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { generateOtp } from '../services/generate-otp';
import { SendgridService } from '../services/sendgrid.service';
import hashPassword from '../services/hash-password';
import { JwtAuthService } from '../services/jwt.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly sendGridService: SendgridService,
    private readonly jwtService: JwtAuthService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const otp = await generateOtp();

      const hashedPassword = await hashPassword(createUserDto.password);

      await this.sendGridService.sendEmail(createUserDto.email, otp);

      await this.userRepository.save({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: hashedPassword,
        emailOtp: otp,
        otpSentAt: new Date(),
      });

      return 'User created successfully';
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    let accessToken;
    const user = await this.findOne(email);

    const passwordValid = await bcrypt.compare(password, user.password);

    if (passwordValid) {
      accessToken = await this.jwtService.generateToken(user);
    }

    return accessToken;
  }

  async verifyOtp(email: string, otp: string) {
    try {
      const user = await this.findOne(email);

      if (user.emailOtp !== otp) {
        throw new HttpException('OTP is invalid', HttpStatus.BAD_REQUEST);
      }

      await this.userRepository.save({ ...user, isEmailVerified: true });

      return 'Email is verified';
    } catch (error) {
      throw error;
    }
  }

  async resendOtp(email: string) {
    try {
      const user = await this.findOne(email);

      if (!user) {
        throw new HttpException('User doesnt exist', HttpStatus.BAD_REQUEST);
      }

      const otp = await generateOtp();

      await this.userRepository.save({
        ...user,
        email: user.email,
        emailOtp: otp,
      });

      await this.sendGridService.sendEmail(email, otp);

      return 'OTP is sent successfully';
    } catch (error) {
      throw error;
    }
  }

  findOne(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
