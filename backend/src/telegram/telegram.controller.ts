import { Controller, Get, Post, Body } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TestMessageDto } from './dto/test-message.dto';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('test-message')
  async testMessage(@Body() dto: TestMessageDto) {
    return await this.telegramService.sendTestMessage(
      dto.telegramBotToken,
      dto.telegramChatId,
    );
  }
}
