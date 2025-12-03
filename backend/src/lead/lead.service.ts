import { Injectable } from '@nestjs/common';
import { SendpulseSendLeadDto } from 'src/sendpluse/dto/send-lead.dto';
import { SendpluseService } from 'src/sendpluse/sendpluse.service';

@Injectable()
export class LeadService {
  constructor(private readonly sendpluseService: SendpluseService) {}
  async sendLead(data: SendpulseSendLeadDto) {
    return this.sendpluseService.sendLead(data);
  }
}
