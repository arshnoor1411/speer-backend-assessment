import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(1)
  firstName: string;

  @MinLength(1)
  lastName: string;

  @IsNotEmpty()
  email: string;

  otp: string;
}
