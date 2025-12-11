import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateOsnovanieDto {
  @IsString()
  @IsOptional()
  forwardButtonText?: string;

  @IsString()
  @IsOptional()
  backButtonText?: string;

  @IsString()
  @IsOptional()
  previewBackText?: string;

  @IsString()
  @IsOptional()
  thankYouText?: string;

  @IsBoolean()
  @IsOptional()
  useCaptcha?: boolean;

  @IsBoolean()
  @IsOptional()
  usePhoneVerification?: boolean;
}

