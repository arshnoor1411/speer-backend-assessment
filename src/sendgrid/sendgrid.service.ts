import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SendgridService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail(to: string, subject: string, text: string, html?: string) {
    const msg = {
      to,
      from: 'arshnoor.anand@gmail.com', // Replace with your email address
      subject,
      text,
      html,
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email', error);
    }
  }
}
