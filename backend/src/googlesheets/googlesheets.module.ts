import { Module } from '@nestjs/common';
import { GooglesheetsService } from './googlesheets.service';
import { GooglesheetsController } from './googlesheets.controller';

@Module({
  controllers: [GooglesheetsController],
  providers: [GooglesheetsService],
  exports: [GooglesheetsService],
})
export class GooglesheetsModule { }
