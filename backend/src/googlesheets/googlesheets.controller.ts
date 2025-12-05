import { Controller } from '@nestjs/common';
import { GooglesheetsService } from './googlesheets.service';

@Controller('googlesheets')
export class GooglesheetsController {
  constructor(private readonly googlesheetsService: GooglesheetsService) {}
}
