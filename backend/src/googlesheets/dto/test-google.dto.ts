import { IsString } from 'class-validator';

export class TestGoogleDto {
  @IsString()
  googleToken: string;

  @IsString()
  googleSheetUrl: string;
}

