import { IsString, IsOptional } from 'class-validator';

export class UpdateTokenDto {
  @IsString()
  @IsOptional()
  telegramBotToken?: string;

  @IsString()
  @IsOptional()
  telegramChatId?: string;

  @IsString()
  @IsOptional()
  googleToken?: string;

  @IsString()
  @IsOptional()
  googleSheetUrl?: string;
}

