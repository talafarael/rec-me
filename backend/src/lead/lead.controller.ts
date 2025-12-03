import { Body, Controller, Post } from '@nestjs/common';
import { LeadService } from './lead.service';
import { SendpulseSendLeadDto } from 'src/sendpluse/dto/send-lead.dto';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}
  @Post()
  async sendLead(@Body() data: SendpulseSendLeadDto) {
    console.log('fa');
    return this.leadService.sendLead(data);
  }
}
