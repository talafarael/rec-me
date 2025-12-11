import { IsString, IsOptional } from 'class-validator';

export class UpdateStep2Dto {
  @IsString()
  @IsOptional()
  nameSurnamePlaceholder?: string;

  @IsString()
  @IsOptional()
  phonePlaceholder?: string;

  @IsString()
  @IsOptional()
  emailPlaceholder?: string;
}

