import { BadRequestException, Injectable } from '@nestjs/common';
import { SendpulseSendLeadDto } from 'src/sendpluse/dto/send-lead.dto';
import { SendpluseService } from 'src/sendpluse/sendpluse.service';
import { getMessageCode } from 'src/twilio/maps/twilio.map';
import { ILead } from './model/lead';
import { TelegramService } from 'src/telegram/telegram.service';

@Injectable()
export class LeadService {
  constructor(
    private readonly sendpluseService: SendpluseService,
    private readonly telegramService: TelegramService,
  ) { }
  async sendLead(data: SendpulseSendLeadDto, ip: string, userAgent: string) {
    const verifyCode = getMessageCode(data.phone);
    const info: ILead = {
      ...data,
      ip,
      user_agent: userAgent,
      created_at: new Date(),
    };

    if (verifyCode?.toString() !== data.verifyCodePhone) {
      throw new BadRequestException('Verification code is incorrect');
    }
    try {
      await this.telegramService.sendLead(info);
    } catch (e) {
      console.error(e);
    }
    try {
      await this.sendpluseService.sendLead(data);
    } catch (e) {
      console.error(e);
    }
    return;
  }
}
