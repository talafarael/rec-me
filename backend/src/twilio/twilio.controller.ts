import { Body, Controller, Get, Post } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { SendVerifyCodeDto } from './dto/send-verify-code.dto';

@Controller('twilio')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) { }
  @Post('')
  async sendVerifyCode(@Body() data: SendVerifyCodeDto) {
    return this.twilioService.sendVerifyCode(data);
  }
}
