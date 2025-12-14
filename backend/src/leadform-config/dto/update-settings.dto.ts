import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSettingsDto {
  @IsBoolean()
  @IsOptional()
  osnovanie?: boolean;

  @IsBoolean()
  @IsOptional()
  step1?: boolean;

  @IsBoolean()
  @IsOptional()
  step2?: boolean;

  @IsBoolean()
  @IsOptional()
  notifications?: boolean;

  @IsBoolean()
  @IsOptional()
  whatsapp?: boolean;

  @IsBoolean()
  @IsOptional()
  api?: boolean;

  @IsBoolean()
  @IsOptional()
  captcha?: boolean;
}

