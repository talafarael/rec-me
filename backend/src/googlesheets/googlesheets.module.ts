import { Module } from '@nestjs/common';
import { GooglesheetsService } from './googlesheets.service';
import { GooglesheetsController } from './googlesheets.controller';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [TokenModule],
  controllers: [GooglesheetsController],
  providers: [GooglesheetsService],
  exports: [GooglesheetsService],
})
export class GooglesheetsModule { }
