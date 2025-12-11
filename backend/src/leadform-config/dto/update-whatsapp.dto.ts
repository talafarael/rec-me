import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class UpdateWhatsappDto {
  @IsBoolean()
  @IsOptional()
  activateButton?: boolean;

  @IsString()
  @IsOptional()
  messageTemplate?: string;

  @IsString()
  @IsOptional()
  linkTemplate?: string;

  @IsString()
  @IsOptional()
  contactNumbers?: string;
}

