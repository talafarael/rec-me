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

  constructor(private readonly configService: ConfigService) {
    this.accountsid = this.configService.get<string>('twilio.accountsid')!;
    this.authtoken = this.configService.get<string>('twilio.authtoken')!;
    this.phoneFrom = this.configService.get<string>('twilio.phone')!;
    this.twilioClient = twilio(this.accountsid, this.authtoken);
  }

  async snedVerifyCode(data: SendVerifyCodeDto) {
    const code = this.generateCode();
    const phone = getMessageCode(data.phone);
    if (phone) return;
    await this.sendSmsApi(data.phone, code.toString());
    setMessageCode(data.phone, code);
    return true;
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
