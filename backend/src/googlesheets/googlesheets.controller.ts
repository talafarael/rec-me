import { Controller, Post, Body } from '@nestjs/common';
import { GooglesheetsService } from './googlesheets.service';
import { TestGoogleDto } from './dto/test-google.dto';

@Controller('googlesheets')
export class GooglesheetsController {
  constructor(private readonly googlesheetsService: GooglesheetsService) {}

  @Post('test-message')
  async testGoogleSheet(@Body() dto: TestGoogleDto) {
    return await this.googlesheetsService.testGoogleSheet(
      dto.googleToken,
      dto.googleSheetUrl,
    );
  }
}
