import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import twilio, { Twilio } from 'twilio';
import { SendVerifyCodeDto } from './dto/send-verify-code.dto';
import { getMessageCode, setMessageCode } from './maps/twilio.map';

@Injectable()
export class TwilioService {
  private readonly accountsid: string;
  private readonly authtoken: string;
  private readonly phoneFrom: string;
  private readonly twilioClient: Twilio;
  private readonly sendingCodes = new Set<string>(); // Блокировка для предотвращения повторной отправки

  constructor(private readonly configService: ConfigService) {
    this.accountsid = this.configService.get<string>('twilio.accountsid')!;
    this.authtoken = this.configService.get<string>('twilio.authtoken')!;
    this.phoneFrom = this.configService.get<string>('twilio.phone')!;
    this.twilioClient = twilio(this.accountsid, this.authtoken);
  }

  async sendVerifyCode(data: SendVerifyCodeDto) {
    if (this.sendingCodes.has(data.phone)) {
      return;
    }

    const existingCode = getMessageCode(data.phone);
    if (existingCode) {
      return;
    }

    this.sendingCodes.add(data.phone);

    try {
      const code = this.generateCode();
      await this.sendSmsApi(data.phone, code.toString());
      setMessageCode(data.phone, code);
      return true;
    } finally {
      setTimeout(() => {
        this.sendingCodes.delete(data.phone);
      }, 10000);
    }
  }
  private generateCode(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }
  private async sendSmsApi(to: string, body: string) {
    const res = await this.twilioClient.messages.create({
      to,
      from: this.phoneFrom,
      body,
    });
    console.log(res);
  }
}
// const client = require('twilio')(accountSid, authToken);
// client.messages.create({
//   body: 'message',
//   from: '+17073703448',
//   to: '+18777804236',
// });
