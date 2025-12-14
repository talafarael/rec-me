import { IsString } from 'class-validator';

export class TestMessageDto {
  @IsString()
  telegramBotToken: string;

  @IsString()
  telegramChatId: string;
}

