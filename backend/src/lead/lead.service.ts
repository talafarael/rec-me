import { BadRequestException, Injectable } from '@nestjs/common';
import { SendpulseSendLeadDto } from 'src/sendpluse/dto/send-lead.dto';
import { SendpluseService } from 'src/sendpluse/sendpluse.service';
import { getMessageCode } from 'src/twilio/maps/twilio.map';

@Injectable()
export class LeadService {
  constructor(private readonly sendpluseService: SendpluseService) {}
  async sendLead(data: SendpulseSendLeadDto) {
    const verifyCode = getMessageCode(data.phone);

    if (verifyCode?.toString() !== data.verifyCodePhone) {
      throw new BadRequestException('Verification code is incorrect');
    }
    return this.sendpluseService.sendLead(data);
  }
}
