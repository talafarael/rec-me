import { Body, Controller, Ip, Post, Headers } from '@nestjs/common';
import { LeadService } from './lead.service';
import { SendpulseSendLeadDto } from 'src/sendpluse/dto/send-lead.dto';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) { }
  @Post()
  async sendLead(
    @Ip() ip: string,
    @Body() data: SendpulseSendLeadDto,
    @Headers('User-Agent') userAgent: string,
  ) {
    return this.leadService.sendLead(data, ip, userAgent);
  }
}
