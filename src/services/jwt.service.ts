import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { applicationConfig } from '../../config/application-config';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: User): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload, {
      secret: applicationConfig.jwt.secret,
    });
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
