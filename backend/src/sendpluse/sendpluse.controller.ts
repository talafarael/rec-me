import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SendpluseService } from './sendpluse.service';

@Controller('sendpluse')
export class SendpluseController {
  constructor(private readonly sendpluseService: SendpluseService) {}

  @Get('addressbooks/:id')
  async getMailingList(@Param('id', ParseIntPipe) id: number) {
    return this.sendpluseService.getMailingList(id);
  }

  @Get('addressbooks')
  async getDefaultMailingList() {
    return this.sendpluseService.getMailingList();
  }
}
