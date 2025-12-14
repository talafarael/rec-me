import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { SendpluseService } from './sendpluse.service';
import { TestSendpulseDto } from './dto/test-sendpulse.dto';

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

  @Post('test-message')
  async testSendpulse(@Body() dto: TestSendpulseDto) {
    return await this.sendpluseService.testSendpulse(
      dto.sendpulseSecret,
      dto.sendpulseClientId,
      dto.sendpulseAddressBookId,
    );
  }
}
