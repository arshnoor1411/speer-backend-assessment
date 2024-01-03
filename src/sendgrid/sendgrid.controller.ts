import { Controller, Get } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';

@Controller('sendgrid')
export class SendgridController {
  constructor(private readonly sendGridService: SendgridService) {}

  @Get('send-email')
  async sendEmail(email: string) {
    const to = email;
    const subject = 'Verification Email';
    const text = 'OTP for verification';
    const html = '<p>This is a test email.</p>';

    await this.sendGridService.sendEmail(to, subject, text, html);
  }
}
